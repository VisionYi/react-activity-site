import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { Link, useParams } from 'react-router';
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Heart,
  Images,
  MapPin,
  MessageSquareText,
  Play,
  Send,
  Sprout,
  Trash2,
  Trees,
  Users,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { DETAIL, EVENTS } from '../data';
import type { Photo, CommentItem, EventItem, ImageAsset } from '../data';
import { formatClock, formatCommentDate, formatEventDate } from '../utils/date';
import './EventDetailPage.scss';

function DetailImage({
  image,
  className,
  priority = false,
}: {
  image: ImageAsset;
  className: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      style={{ objectPosition: image.position }}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

function SectionTitle({
  title,
  icon: Icon,
  count,
}: {
  title: string;
  icon: LucideIcon;
  count?: string;
}) {
  return (
    <div className="detail-section-title">
      <Icon size={24} aria-hidden="true" />
      <h2>{title}</h2>
      {count && <span className="detail-section-title__count">{count}</span>}
    </div>
  );
}

function EventHero({ event }: { event: EventItem }) {
  return (
    <header className="event-hero">
      <div className="event-hero__navigation">
        <nav className="event-hero__breadcrumb" aria-label="麵包屑">
          <Link to="/">首頁</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">活動・{event.title}</span>
        </nav>
        <span className="event-hero__category">
          <span className="status-dot" />
          {event.category}
        </span>
      </div>
      <div className="event-hero__visual">
        <DetailImage image={event.cover} className="event-hero__image" priority />
        <div className="event-hero__copy">
          <p className="event-hero__code">活動代碼 #{event.code}</p>
          <h1 className="event-hero__title">{event.title}</h1>
          <p className="event-hero__subtitle">{event.story}</p>
          <ul className="event-hero__meta">
            <li>
              <CalendarDays size={18} aria-hidden="true" />
              <time dateTime={`${event.date}T${event.startTime}`}>
                {formatEventDate(event.date)} {formatClock(event.date, event.startTime)}–
                {formatClock(event.date, event.endTime)}
              </time>
            </li>
            <li>
              <MapPin size={18} aria-hidden="true" />
              {event.location}
            </li>
            <li>
              <Users size={18} aria-hidden="true" />
              {event.participantCount} 人共同參與
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function EventStory() {
  const article = DETAIL.article;
  return (
    <article className="detail-card event-story">
      <header className="event-story__header">
        <p className="event-story__eyebrow">
          <Sprout size={18} aria-hidden="true" />
          {article.eyebrow}
        </p>
        <h2 className="event-story__title">{article.title}</h2>
        <p className="event-story__author">文字紀實：{article.author}</p>
      </header>
      <blockquote className="event-story__quote">{article.quote}</blockquote>
      <p className="event-story__paragraph">{article.introduction}</p>
      <h3 className="event-story__chapter">{article.firstChapter.title}</h3>
      <p className="event-story__paragraph">
        {article.firstChapter.body}
        <mark>{article.firstChapter.highlight}</mark>
        {article.firstChapter.ending}
      </p>
      <div className="event-story__photos">
        {article.photos.map((photo) => (
          <figure key={photo.image.src}>
            <DetailImage image={photo.image} className="event-story__image" />
            <figcaption className="event-story__caption">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <h3 className="event-story__chapter event-story__chapter--warm">
        {article.secondChapter.title}
      </h3>
      <p className="event-story__paragraph">{article.secondChapter.body}</p>
      <div
        className="event-story__table-scroll"
        role="region"
        aria-label="活動探索紀錄表，可水平捲動"
        tabIndex={0}
      >
        <table className="event-story__table">
          <caption className="sr-only">森林活動各階段的亮點與家庭迴響</caption>
          <thead>
            <tr>
              {article.tableHeadings.map((heading) => (
                <th key={heading} scope="col">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {article.tableRows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={cell} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={cell}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside className="event-story__reminders" aria-label="活動隨行小提醒">
        <h3>
          <CheckCircle2 size={18} aria-hidden="true" />
          活動隨行小提醒整理：
        </h3>
        <ul>
          {article.reminders.map((reminder) => (
            <li key={reminder}>{reminder}</li>
          ))}
        </ul>
      </aside>
    </article>
  );
}

function DetailSidebar({ date }: { date: string }) {
  return (
    <aside className="detail-sidebar" aria-label="活動時間軸與地點">
      <div className="detail-sidebar__inner">
        <section className="sidebar-card" aria-labelledby="timeline-title">
          <h2 className="sidebar-card__title" id="timeline-title">
            <Clock3 size={22} aria-hidden="true" />
            活動回顧時光軸
          </h2>
          <p className="sidebar-card__intro">這一天，我們一起做了什麼？</p>
          <ol className="event-timeline">
            {DETAIL.timeline.map((item) => (
              <li className="event-timeline__item" key={item.time}>
                <time className="event-timeline__time" dateTime={`${date}T${item.time}`}>
                  {formatClock(date, item.time)}
                </time>
                <h3 className="event-timeline__title">{item.title}</h3>
                <p className="event-timeline__description">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="sidebar-card" aria-labelledby="location-title">
          <h2 className="sidebar-card__title" id="location-title">
            活動地點資訊
            <MapPin size={20} aria-hidden="true" />
          </h2>
          <div
            className="sidebar-card__map"
            role="img"
            aria-label="東眼山活動地點示意版位，非互動地圖"
          >
            <span>{DETAIL.location.title}</span>
          </div>
          <p className="sidebar-card__description">
            <strong>地址：</strong>
            {DETAIL.location.address}
          </p>
          <p className="sidebar-card__description">
            <strong>氣候提醒：</strong>
            {DETAIL.location.reminder}
          </p>
        </section>
      </div>
    </aside>
  );
}

function HighlightVideo({ eventId }: { eventId: string }) {
  return (
    <section className="detail-card detail-video" aria-label="活動精華影片">
      <SectionTitle title="活動精華影片" icon={Video} />
      <Link
        className="detail-video__poster"
        to={`/events/${eventId}`}
        aria-label="活動精華影片示意，連回本活動頁面"
      >
        <DetailImage image={DETAIL.video.image} className="detail-video__image" />
        <span className="detail-video__play">
          <Play size={28} fill="currentColor" aria-hidden="true" />
        </span>
      </Link>
      <p className="detail-video__description">{DETAIL.video.description}</p>
    </section>
  );
}

function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const categories = Array.from(new Set(photos.map((photo) => photo.category)));
  const matchingPhotos = photos.filter((photo) => !category || photo.category === category);
  const visiblePhotos = matchingPhotos.slice(0, visibleCount);
  const remaining = Math.max(0, matchingPhotos.length - visiblePhotos.length);

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    setVisibleCount(8);
  }

  return (
    <section className="detail-card photo-gallery" aria-label="活動精彩照片">
      <SectionTitle title="活動精彩照片" icon={Images} />
      <div
        className="photo-gallery__filters flex flex-wrap gap-2"
        role="group"
        aria-label="照片分類"
      >
        {['', ...categories].map((item) => (
          <button
            className="photo-gallery__filter"
            key={item || 'all'}
            type="button"
            aria-pressed={category === item}
            onClick={() => selectCategory(item)}
          >
            {item || '全部'}（
            {item ? photos.filter((photo) => photo.category === item).length : photos.length}）
          </button>
        ))}
      </div>
      {matchingPhotos.length === 0 && <p className="photo-gallery__empty">這場活動還沒有照片。</p>}
      <ul className="photo-gallery__grid">
        {visiblePhotos.map((photo) => (
          <li key={photo.id}>
            <figure>
              <div className="photo-gallery__placeholder" role="img" aria-label={photo.alt}>
                <Trees size={32} aria-hidden="true" />
                <small>{photo.alt}</small>
              </div>
              <figcaption className="sr-only">{photo.category}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <div className="photo-gallery__more">
          <button
            className="button button--soft button--pill"
            type="button"
            onClick={() => setVisibleCount(visibleCount + 8)}
          >
            瀏覽更多精彩照片（還有 {remaining} 張）
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

function CommentForm({ onAdd }: { onAdd: (body: string) => void }) {
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedBody = body.trim();
    if (!trimmedBody) {
      setError('先寫一點回憶再送出喔。');
      return;
    }
    onAdd(trimmedBody);
    setBody('');
    setError('');
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label className="comment-form__label">
        <span className="sr-only">留下今天的回憶</span>
        <textarea
          className="comment-form__control"
          required
          maxLength={500}
          value={body}
          placeholder="寫下你今天的回憶……"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'comment-error' : undefined}
          onChange={(event) => {
            setBody(event.currentTarget.value);
            setError('');
          }}
        />
      </label>
      {error && (
        <p className="comment-form__error" id="comment-error" role="alert">
          {error}
        </p>
      )}
      <div className="comment-form__actions">
        <p className="comment-form__count">{body.length}／500</p>
        <button className="button button--accent button--pill" type="submit">
          <Send size={16} aria-hidden="true" />
          送出回憶
        </button>
      </div>
    </form>
  );
}

type DetailProps = {
  comments: CommentItem[];
  onAdd: (eventId: string, body: string) => void;
  onDelete: (id: string) => void;
  onToggleLike: (id: string) => void;
};

function CommentSection({
  eventId,
  comments,
  onAdd,
  onDelete,
  onToggleLike,
}: DetailProps & { eventId: string }) {
  return (
    <section className="detail-card detail-comments" aria-label="活動心得與留言">
      <SectionTitle
        title="活動心得與留言"
        icon={MessageSquareText}
        count={`${comments.length} 則回憶分享`}
      />
      <p className="detail-comments__intro">
        參加了這次活動嗎？寫下你當下的感動，或是想對夥伴們說的話。
      </p>
      <CommentForm key={eventId} onAdd={(body) => onAdd(eventId, body)} />
      {comments.length === 0 && (
        <p className="detail-comments__empty">還沒有留言，來留下第一段回憶吧。</p>
      )}
      <ul className="comment-list">
        {comments.map((item) => (
          <li className="comment-list__item" key={item.id}>
            <div className="comment-list__header">
              <strong>訪客</strong>
              <time dateTime={item.createdAt}>{formatCommentDate(item.createdAt)}</time>
            </div>
            <p className="comment-list__body">{item.body}</p>
            <div className="comment-list__actions">
              <button
                className="comment-list__like"
                type="button"
                aria-pressed={item.liked}
                aria-label={`${item.liked ? '收回愛心' : '送出愛心'}（${item.likes}）`}
                onClick={() => onToggleLike(item.id)}
              >
                <Heart size={16} fill={item.liked ? 'currentColor' : 'none'} aria-hidden="true" />
                {item.likes}
              </button>
              <button
                className="comment-list__delete"
                type="button"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 size={14} aria-hidden="true" />
                刪除這則留言
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function EventDetailPage({ comments, onAdd, onDelete, onToggleLike }: DetailProps) {
  const { eventId } = useParams();
  const event = EVENTS.find((item) => item.id === eventId);
  if (!event)
    return (
      <main className="page event-detail">
        <h1>找不到這場活動</h1>
        <Link to="/">返回活動首頁</Link>
      </main>
    );
  const eventComments = comments.filter((item) => item.eventId === event.id);

  return (
    <main className="page event-detail">
      <EventHero event={event} />
      <div className="event-detail__layout">
        <EventStory />
        <DetailSidebar date={event.date} />
        <HighlightVideo eventId={event.id} />
        <PhotoGallery key={event.id} photos={event.photos} />
        <CommentSection
          eventId={event.id}
          comments={eventComments}
          onAdd={onAdd}
          onDelete={onDelete}
          onToggleLike={onToggleLike}
        />
      </div>
    </main>
  );
}
