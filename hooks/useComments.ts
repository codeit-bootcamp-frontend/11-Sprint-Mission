import { useState, useEffect } from 'react';
import useAsyncRequest from './useAsyncRequest';
import { CommentType } from '@/types/types';

type FetchCommentsFunction = (id: string) => Promise<{ list: CommentType[] }>;

/**
 * 댓글 목록을 가져오는 커스텀 훅
 */
function useComments(fetchCommentsFunction: FetchCommentsFunction, id: string | undefined) {
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);
  const { execute, isLoading, error } = useAsyncRequest();

  useEffect(() => {
    const loadComments = async () => {
      if (!id) return;

      const result = await execute(() => fetchCommentsFunction(id));
      if (result) {
        setCommentsList(result.list);
      }
    };

    loadComments();
  }, [id, execute, fetchCommentsFunction]);

  const handleEditSubmit = (item: CommentType, updatedContent: string) => {
    setCommentsList((prevItems) =>
      prevItems.map((comment) =>
        comment.id === item.id ? { ...comment, content: updatedContent } : comment
      )
    );
  };

  const handleDeleteClick = (commentId: string) => {
    setCommentsList((prevItems) => prevItems.filter((item) => item.id !== commentId));
  };

  return {
    commentsList,
    isLoading,
    error,
    handleEditSubmit,
    handleDeleteClick,
  };
}

export default useComments;
