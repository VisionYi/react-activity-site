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

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
