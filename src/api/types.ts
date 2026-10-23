import type { DETAIL } from '../mocks/data';

export type Photo = {
  id: string;
  category: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

export type EventSummary = {
  id: string;
  code: string;
  title: string;
  date: string;
  category: string;
  location: string;
  excerpt: string;
  cover: Omit<Photo, 'id' | 'category'>;
};

export type EventDetail = EventSummary & {
  startTime: string;
  endTime: string;
  participantCount: number;
  story: string;
  photos: Photo[];
  content: typeof DETAIL;
};

export type Comment = {
  id: string;
  createdAt: string;
  eventId: string;
  author: string;
  body: string;
  likes: number;
  liked: boolean;
};

export type EventFilters = {
  query: string;
  year: string;
  category: string;
  sort: 'newest' | 'oldest';
};

export type EventListResponse = {
  events: EventSummary[];
  total: number;
  totalEvents: number;
  categories: { name: string; count: number }[];
  years: string[];
};

export type ApiErrorPayload = { message: string; fieldErrors?: Record<string, string> };

export class ApiError extends Error {
  status: number;
  payload: ApiErrorPayload;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}
