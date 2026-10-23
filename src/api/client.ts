import axios from 'axios';
import useSWR from 'swr';
import type {
  ApiErrorPayload,
  Comment,
  EventDetail,
  EventFilters,
  EventListResponse,
} from './types';
import { ApiError } from './types';

const request = axios.create({
  baseURL: `${import.meta.env.BASE_URL}api`,
});

request.interceptors.response.use(
  (response) => response.data,
  (error: unknown) => {
    if (axios.isAxiosError<ApiErrorPayload>(error) && error.response) {
      const payload = error.response.data;
      return Promise.reject(
        new ApiError(error.response.status, {
          message: payload?.message ?? `請求失敗（${error.response.status}）`,
          fieldErrors: payload?.fieldErrors,
        }),
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
