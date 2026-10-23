import axios from 'axios';
import useSWR from 'swr';
import type {
  Comment,
  EventDetail,
  EventFilters,
  EventListResponse,
} from './types';
import { ApiError } from './types';

const request = axios.create({
  baseURL: `${import.meta.env.BASE_URL}api`,
});

function normalizeErrorPayload(value: unknown): string {
  const message = (value as { message?: unknown } | null)?.message;
  return typeof message === 'string' ? message : '請求失敗，請稍後再試。';
}

request.interceptors.response.use(
  (response) => response.data,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return Promise.reject(
          new ApiError('目前無法連線到服務，請檢查網路後再試。'),
        );
      }

      return Promise.reject(
        new ApiError(normalizeErrorPayload(error.response.data), error.response.status),
      );
    }

    return Promise.reject(error);
  },
);

type RequestKey<TParams = unknown> = {
  url: string;
  params?: TParams;
};

type RequestData<TData> = {
  url: string;
  data: TData;
};

const fetcherGet = <TResponse, TParams = unknown>({ url, params }: RequestKey<TParams>) =>
  request.get<TResponse, TResponse>(url, { params });

const fetcherPost = <TResponse, TData>({ url, data }: RequestData<TData>) =>
  request.post<TResponse, TResponse>(url, data);

const fetcherPatch = <TResponse, TData>({ url, data }: RequestData<TData>) =>
  request.patch<TResponse, TResponse>(url, data);

const fetcherDelete = <TResponse, TParams = unknown>({ url, params }: RequestKey<TParams>) =>
  request.delete<TResponse, TResponse>(url, { params });

// 第二個 Axios 泛型表示 interceptor 已把 AxiosResponse 解開成 response.data。
export const useGetEvents = (params: EventFilters) =>
  useSWR<EventListResponse>({ url: 'events', params }, fetcherGet<EventListResponse>);

export const useGetEventDetail = (eventId: string) =>
  useSWR<EventDetail>({ url: `events/${eventId}` }, fetcherGet<EventDetail>);

export const useGetEventComments = (eventId: string) =>
  useSWR<Comment[]>({ url: `events/${eventId}/comments` }, fetcherGet<Comment[]>);

export const postEventComments = (eventId: string, data: Pick<Comment, 'author' | 'body'>) =>
  fetcherPost<Comment, Pick<Comment, 'author' | 'body'>>({
    url: `events/${eventId}/comments`,
    data,
  });

export const patchEventCommentsLike = (
  eventId: string,
  commentId: string,
  data: { liked: boolean },
) => fetcherPatch<Comment, { liked: boolean }>({
  url: `events/${eventId}/comments/${commentId}/like`,
  data,
});

export const deleteEventComment = (eventId: string, commentId: string) =>
  fetcherDelete<{ success: true }>({
    url: `events/${eventId}/comments/${commentId}`,
  });
