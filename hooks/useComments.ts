import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAsyncRequest from './useAsyncRequest';
import { CommentType } from '@/types/types';

type FetchCommentsFunction = (
  productId: string
) => Promise<{ list: Comment[] }>;

const useComments = (fetchCommentsFunction: FetchCommentsFunction) => {
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);
  const { execute, isLoading, error } = useAsyncRequest();
  const router = useRouter();
  const { productId } = router.query as { productId?: string };

  useEffect(() => {
    const loadComments = async () => {
      if (!productId) return;
      const result = await execute(() => fetchCommentsFunction(productId));
      if (result) {
        setCommentsList(result.list);
      }
    };

    loadComments();
  }, [productId, execute, fetchCommentsFunction]);

  const handleEditSubmit = (item: CommentType, updatedContent: string) => {
    setCommentsList((prevItems) =>
      prevItems.map((comment) =>
        comment.id === item.id
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
  };

  const handleDeleteClick = (commentId: string) => {
    setCommentsList((prevItems) =>
      prevItems.filter((item) => item.id !== commentId)
    );
  };

  return {
    commentsList,
    isLoading,
    error,
    handleEditSubmit,
    handleDeleteClick,
  };
};

export default useComments;
