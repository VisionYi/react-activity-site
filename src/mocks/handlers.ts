import { http, HttpResponse } from 'msw';
import { DETAIL, EVENTS } from './data';
import type { Comment, EventDetail, EventSummary } from '../api/types';

const API_PATH = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/api`;
const commentsByEvent = new Map<string, Comment[]>();

function findEvent(eventId: string) {
  return EVENTS.find((event) => event.id === eventId);
}

function summaryOf(event: (typeof EVENTS)[number]): EventSummary {
  return {
    id: event.id,
    code: event.code,
    title: event.title,
    date: event.date,
    category: event.category,
    location: event.location,
    excerpt: event.excerpt,
    cover: event.cover,
  };
}

function listComments(eventId: string) {
  if (!commentsByEvent.has(eventId)) commentsByEvent.set(eventId, []);
  return commentsByEvent.get(eventId)!;
}

function jsonError(status: number, message: string, fieldErrors?: Record<string, string>) {
  return HttpResponse.json({ message, ...(fieldErrors ? { fieldErrors } : {}) }, { status });
}

export const handlers = [
  http.get(`${API_PATH}/events`, ({ request }) => {
    const url = new URL(request.url);
    const query = (url.searchParams.get('query') ?? '').trim().toLocaleLowerCase();
    const year = url.searchParams.get('year') ?? '';
    const category = url.searchParams.get('category') ?? '';
    const sort = url.searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest';

    const matchingEvents = EVENTS.filter(
      (event) =>
        `${event.title} ${event.location} ${event.excerpt}`.toLocaleLowerCase().includes(query) &&
        (!year || event.date.startsWith(year)) &&
        (!category || event.category === category),
    ).sort((first, second) =>
      sort === 'newest'
        ? second.date.localeCompare(first.date)
        : first.date.localeCompare(second.date),
    );
    const categories = Array.from(new Set(EVENTS.map((event) => event.category))).map((name) => ({
      name,
      count: EVENTS.filter((event) => event.category === name).length,
    }));
    const years = Array.from(new Set(EVENTS.map((event) => event.date.slice(0, 4)))).sort().reverse();

    return HttpResponse.json({
      events: matchingEvents.map(summaryOf),
      total: matchingEvents.length,
      totalEvents: EVENTS.length,
      categories,
      years,
    });
  }),
  http.get(`${API_PATH}/events/:eventId`, ({ params }) => {
    const event = findEvent(String(params.eventId));
    if (!event) return jsonError(404, '找不到這場活動。');

    const detail: EventDetail = {
      ...summaryOf(event),
      startTime: event.startTime,
      endTime: event.endTime,
      participantCount: event.participantCount,
      story: event.story,
      photos: event.photos,
      content: DETAIL,
    };
    return HttpResponse.json(detail);
  }),
  http.get(`${API_PATH}/events/:eventId/comments`, ({ params }) => {
    const eventId = String(params.eventId);
    if (!findEvent(eventId)) return jsonError(404, '找不到這場活動。');
    return HttpResponse.json(listComments(eventId));
  }),
  http.post(`${API_PATH}/events/:eventId/comments`, async ({ params, request }) => {
    const eventId = String(params.eventId);
    if (!findEvent(eventId)) return jsonError(404, '找不到這場活動。');

    let input: unknown;
    try {
      input = await request.json();
    } catch {
      return jsonError(400, '留言資料格式不正確。');
    }
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      return jsonError(400, '留言資料格式不正確。');
    }
    const { author: rawAuthor, body: rawBody } = input as { author?: unknown; body?: unknown };
    const author = typeof rawAuthor === 'string' ? rawAuthor.trim() : '';
    const body = typeof rawBody === 'string' ? rawBody.trim() : '';
    const fieldErrors: Record<string, string> = {};
    if (!author) fieldErrors.author = '請填寫暱稱。';
    else if (author.length > 40 || (rawAuthor as string).length > 40)
      fieldErrors.author = '暱稱最多 40 字。';
    if (!body) fieldErrors.body = '請寫下留言內容。';
    else if (body.length > 500 || (rawBody as string).length > 500)
      fieldErrors.body = '留言最多 500 字。';
    if (Object.keys(fieldErrors).length > 0) {
      return jsonError(400, '請檢查留言欄位。', fieldErrors);
    }

    const comment: Comment = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      eventId,
      author,
      body,
      likes: 0,
      liked: false,
    };
    listComments(eventId).unshift(comment);
    return HttpResponse.json(comment, { status: 201 });
  }),
  http.patch(
    `${API_PATH}/events/:eventId/comments/:commentId/like`,
    async ({ params, request }) => {
      const eventId = String(params.eventId);
      if (!findEvent(eventId)) return jsonError(404, '找不到這場活動。');
      let input: unknown;
      try {
        input = await request.json();
      } catch {
        return jsonError(400, '愛心資料格式不正確。');
      }
      if (!input || typeof input !== 'object' || Array.isArray(input)) {
        return jsonError(400, '愛心資料格式不正確。');
      }
      const liked = (input as { liked?: unknown }).liked;
      if (typeof liked !== 'boolean') return jsonError(400, 'liked 必須是布林值。');

      const comment = listComments(eventId).find((item) => item.id === String(params.commentId));
      if (!comment) return jsonError(404, '找不到這則留言。');
      if (comment.liked !== liked) {
        comment.likes = Math.max(0, comment.likes + (liked ? 1 : -1));
        comment.liked = liked;
      }
      return HttpResponse.json(comment);
    },
  ),
  http.delete(`${API_PATH}/events/:eventId/comments/:commentId`, ({ params }) => {
    const eventId = String(params.eventId);
    if (!findEvent(eventId)) return jsonError(404, '找不到這場活動。');
    const comments = listComments(eventId);
    const commentIndex = comments.findIndex((item) => item.id === String(params.commentId));
    if (commentIndex === -1) return jsonError(404, '找不到這則留言。');
    comments.splice(commentIndex, 1);
    return HttpResponse.json({ success: true as const });
  }),
];
