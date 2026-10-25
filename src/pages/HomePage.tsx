import { useEffect, useRef, useState } from 'react';
import { formatDate } from '../utils/date';
import { Link } from 'react-router';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Compass,
  HandHeart,
  Images,
  MapPin,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trees,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HOME, ALBUMS, VIDEOS } from '../data';
import type { EventFilters } from '../api/types';
import { useGetEvents, useGetEventDetail } from '../api/client';
import { INITIAL_FILTERS, useEventFilters } from '../hooks/useEventFilters';
import ActivityImage from '../components/ActivityImage';
import './HomePage.scss';

function SectionHeading({
  content,
  icon: Icon,
  warm = false,
}: {
  content: { eyebrow: string; title: string; description: string };
  icon: LucideIcon;
  warm?: boolean;
}) {
  return (
    <div className="section-heading">
      <p className={`section-heading__eyebrow${warm ? ' section-heading__eyebrow--warm' : ''}`}>
        <Icon size={18} aria-hidden="true" />
        {content.eyebrow}
      </p>
      <h2 className="section-heading__title">{content.title}</h2>
      <p className="section-heading__description">{content.description}</p>
    </div>
  );
}

function HeroSection() {
  const { filters } = useEventFilters();
  const { data: events } = useGetEvents(filters);
  const { data: featured, isLoading } = useGetEventDetail(HOME.hero.featuredEventId);
  const totalEvents = events?.totalEvents ?? 0;
  const stats = [
    { value: totalEvents, label: '場溫暖活動' },
    { value: ALBUMS.length, label: '本回憶相簿' },
    { value: VIDEOS.length, label: '部精選影片' },
  ];
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="status-dot" />
            {HOME.hero.eyebrow}
          </p>
          <h1 className="hero__title" id="hero-title">
            {HOME.hero.title}
            <br />
            <span>{HOME.hero.highlight}</span>
          </h1>
          <p className="hero__description">{HOME.hero.description}</p>
          <div className="hero__actions">
            <Link
              className="button button--accent button--pill"
              to="/?section=activities"
              onClick={() => document.getElementById('activities')?.scrollIntoView()}
            >
              <Compass size={18} aria-hidden="true" />
              探索活動紀錄
            </Link>
            <Link
              className="button button--soft button--pill"
              to="/?section=albums"
              onClick={() => document.getElementById('albums')?.scrollIntoView()}
            >
              <Images size={18} aria-hidden="true" />
              瀏覽回憶相簿
            </Link>
          </div>
          <dl className="activity-stats" aria-label="首頁展示資料統計">
            {stats.map((stat) => (
              <div className="activity-stats__item" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero__visual">
          {featured ? (
            <>
              <ActivityImage image={featured.cover} className="hero__photo" priority />
              <p className="hero__badge" role="status">
                <span className="status-dot" />
                {HOME.hero.badge}
              </p>
              <Link className="hero__featured" to={`/events/${featured.id}`}>
                <span className="hero__featured-icon">
                  <Trees size={24} aria-hidden="true" />
                </span>
                <span className="hero__featured-copy">
                  <span className="hero__featured-label">{HOME.hero.featuredLabel}</span>
                  <strong>{featured.title}</strong>
                  <span>{featured.location}</span>
                </span>
                <ArrowRight size={20} className="shrink-0" aria-hidden="true" />
              </Link>
            </>
          ) : (
            isLoading ? <p className="hero__featured-copy" role="status">載入精選活動…</p> : null
          )}
        </div>
      </div>
    </section>
  );
}

type FilterProps = {
  filters: EventFilters;
  onChange: (patch: Partial<EventFilters>) => void;
  queryDraft: string;
  onCompositionStart: () => void;
  onCompositionEnd: (query: string) => void;
  onReset: () => void;
};
function FilterBar({
  filters,
  onChange,
  queryDraft,
  onCompositionStart,
  onCompositionEnd,
  onReset,
  count,
  total,
  categories,
  years,
}: FilterProps & {
  count: number;
  total: number;
  categories: { name: string; count: number }[];
  years: string[];
}) {
  return (
    <fieldset className="filter-bar">
      <legend className="sr-only">尋找活動回憶</legend>
      <div className="filter-bar__fields">
        <label className="filter-bar__field filter-bar__field--search">
          <span className="sr-only">搜尋活動名稱或地點</span>
          <Search size={18} aria-hidden="true" />
          <input
            className="filter-bar__control"
            type="search"
            placeholder="搜尋活動名稱、關鍵字或地點…"
            value={queryDraft}
            onChange={(event) => onChange({ query: event.currentTarget.value })}
            onCompositionStart={onCompositionStart}
            onCompositionEnd={(event) => onCompositionEnd(event.currentTarget.value)}
          />
        </label>
        <label className="filter-bar__field">
          <span className="sr-only">年份</span>
          <CalendarDays size={16} aria-hidden="true" />
          <select
            className="filter-bar__control"
            value={filters.year}
            onChange={(event) => onChange({ year: event.currentTarget.value })}
          >
            <option value="">全部年份</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year} 年度
              </option>
            ))}
          </select>
          <ChevronDown className="filter-bar__chevron" size={14} aria-hidden="true" />
        </label>
        <label className="filter-bar__field">
          <span className="sr-only">日期排序</span>
          <SlidersHorizontal size={16} aria-hidden="true" />
          <select
            className="filter-bar__control"
            value={filters.sort}
            onChange={(event) =>
              onChange({ sort: event.currentTarget.value === 'oldest' ? 'oldest' : 'newest' })
            }
          >
            <option value="newest">日期由新到舊</option>
            <option value="oldest">日期由舊到新</option>
          </select>
          <ChevronDown className="filter-bar__chevron" size={14} aria-hidden="true" />
        </label>
      </div>
      <div
        className="filter-bar__categories flex flex-wrap gap-2"
        role="group"
        aria-label="活動分類"
      >
        {['', ...categories.map((category) => category.name)].map((category) => (
          <button
            className="filter-bar__category"
            key={category || 'all'}
            type="button"
            aria-pressed={filters.category === category}
            onClick={() => onChange({ category })}
          >
            {category || '全部'}
            <span>
              {category ? categories.find((item) => item.name === category)?.count ?? 0 : total}
            </span>
          </button>
        ))}
      </div>
      <div className="filter-bar__summary">
        <p className="filter-bar__count" aria-live="polite">
          <span className="status-dot" />
          顯示 {count} 場活動，共 {total} 場精彩紀錄
        </p>
        <button
          className="filter-bar__reset"
          type="button"
          onClick={onReset}
        >
          重設所有條件
        </button>
      </div>
    </fieldset>
  );
}

function ActivitySection() {
  const { filters, updateFilters } = useEventFilters();
  const [queryInput, setQueryInput] = useState({ value: filters.query, committedQuery: filters.query });
  const [isComposing, setIsComposing] = useState(false);
  const skipDebounceRef = useRef(false);
  const queryDraft = queryInput.committedQuery === filters.query ? queryInput.value : filters.query;

  useEffect(() => {
    if (isComposing) return;
    if (queryDraft === filters.query) {
      skipDebounceRef.current = false;
      return;
    }
    if (skipDebounceRef.current) return;

    const timeoutId = window.setTimeout(() => updateFilters({ query: queryDraft }), 600);
    return () => window.clearTimeout(timeoutId);
  }, [filters.query, isComposing, queryDraft, updateFilters]);

  function handleFilterChange(patch: Partial<EventFilters>) {
    const { query, ...immediateFilters } = patch;

    if (Object.hasOwn(patch, 'query')) {
      skipDebounceRef.current = false;
      setQueryInput({ value: query ?? '', committedQuery: filters.query });
    }

    if (Object.keys(immediateFilters).length > 0) updateFilters(immediateFilters);
  }

  function resetFilters() {
    skipDebounceRef.current = true;
    setQueryInput({ value: INITIAL_FILTERS.query, committedQuery: filters.query });
    setIsComposing(false);
    updateFilters(INITIAL_FILTERS);
  }

  const { data, isLoading } = useGetEvents(filters);
  const visibleEvents = data?.events ?? [];
  return (
    <section className="activity-section" id="activities" aria-label="活動探索">
      <div className="home-container">
        <SectionHeading content={HOME.events} icon={CalendarDays} />
        <FilterBar
          filters={filters}
          queryDraft={queryDraft}
          onChange={handleFilterChange}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(query) => {
            setQueryInput({ value: query, committedQuery: filters.query });
            setIsComposing(false);
          }}
          onReset={resetFilters}
          count={data?.total ?? 0}
          total={data?.totalEvents ?? 0}
          categories={data?.categories ?? []}
          years={data?.years ?? []}
        />
        {isLoading && <p className="activity-section__empty">正在載入活動資料…</p>}
        {!isLoading && data && visibleEvents.length === 0 && (
          <p className="activity-section__empty">找不到符合條件的活動，試著重設所有條件。</p>
        )}
        <ul className="activity-list">
          {visibleEvents.map((event) => (
            <li key={event.id}>
              <article className="event-card">
                <Link className="event-card__link" to={`/events/${event.id}`}>
                  <div className="event-card__cover">
                    <ActivityImage image={event.cover} className="event-card__image" />
                    <span className="event-card__category">{event.category}</span>
                    <span className="event-card__tag">活動紀錄</span>
                  </div>
                  <div className="event-card__body">
                    <p className="event-card__meta">
                      <span>
                        <CalendarDays size={14} aria-hidden="true" />
                        <time dateTime={event.date}>{formatDate(event.date)}</time>
                      </span>
                      <span>
                        <MapPin size={14} aria-hidden="true" />
                        {event.location}
                      </span>
                    </p>
                    <h3 className="event-card__title">{event.title}</h3>
                    <p className="event-card__description">{event.excerpt}</p>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AlbumSection() {
  return (
    <section className="album-section" id="albums" aria-label="回憶相簿">
      <div className="home-container">
        <SectionHeading content={HOME.albums} icon={Images} warm />
        <ul className="album-grid">
          {ALBUMS.map((album, index) => (
            <li
              className={`album-grid__item${index === 0 ? ' album-grid__item--featured' : index === 3 ? ' album-grid__item--wide' : ''}`}
              key={album.id}
            >
              <Link className="album-card" to="/">
                <ActivityImage image={album.image} className="album-card__image" />
                <div className="album-card__copy">
                  {album.label && <span className="album-card__label">{album.label}</span>}
                  <h3 className="album-card__title">{album.title}</h3>
                  <p className="album-card__subtitle">{album.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="video-section" aria-label="精選影片">
      <div className="home-container">
        <SectionHeading content={HOME.videos} icon={Video} />
        <ul className="video-grid">
          {VIDEOS.map((video) => (
            <li key={video.id}>
              <Link className="video-card" to="/">
                <div className="video-card__cover">
                  <ActivityImage image={video.image} className="video-card__image" />
                  <span className="video-card__play">
                    <Play size={26} fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
                <div className="video-card__body">
                  <p className="video-card__category">{video.category}</p>
                  <h3 className="video-card__title">{video.title}</h3>
                  <p className="video-card__author">紀錄者：{video.author}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CommunityBanner() {
  return (
    <section className="community-section" aria-label="一起留下生命回憶">
      <div className="home-container">
        <div className="community-banner">
          <p className="community-banner__eyebrow">
            <HandHeart size={18} aria-hidden="true" />
            {HOME.banner.eyebrow}
          </p>
          <h2 className="community-banner__title">
            {HOME.banner.title}
            <br />
            {HOME.banner.highlight}
          </h2>
          <p className="community-banner__description">{HOME.banner.description}</p>
          <Sparkles
            className="community-banner__decoration"
            size={160}
            strokeWidth={0.7}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ActivitySection />
      <AlbumSection />
      <VideoSection />
      <CommunityBanner />
    </main>
  );
}
