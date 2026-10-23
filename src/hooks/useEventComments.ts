import { useState } from 'react';
import {
  deleteEventComment,
  patchEventCommentsLike,
  postEventComments,
  useGetEventComments,
} from '../api/client';
import { useApiError } from './useApiError';

export type CommentActionResult = { ok: true } | { ok: false };

export function useEventComments(eventId: string) {
  const {
    data,
    isLoading,
    mutate,
  } = useGetEventComments(eventId);
  const [isMutating, setIsMutating] = useState(false);
  const reportError = useApiError();

  async function runAction(action: () => Promise<unknown>): Promise<CommentActionResult> {
    setIsMutating(true);
    try {
      await action();
      await mutate();
      return { ok: true };
    } catch (error) {
      reportError(error);
      return { ok: false };
    } finally {
      setIsMutating(false);
    }
  }

  function addComment(author: string, body: string) {
    return runAction(() => postEventComments(eventId, { author, body }));
  }

  function setCommentLiked(commentId: string, liked: boolean) {
    return runAction(() => patchEventCommentsLike(eventId, commentId, { liked }));
  }

  function deleteComment(commentId: string) {
    return runAction(() => deleteEventComment(eventId, commentId));
  }

  return {
    comments: data,
    isLoading,
    isMutating,
    addComment,
    setCommentLiked,
    deleteComment,
  };
}
