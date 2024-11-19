import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAsyncRequest from './useAsyncRequest';
import { Comment } from '../types';

type FetchCommentsFunction = (
  productId: string,
) => Promise<{ list: Comment[] }>;

const useComments = (fetchCommentsFunction: FetchCommentsFunction) => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const { execute, isLoading, error } = useAsyncRequest();
  const { productId } = useParams<{ productId: string }>();

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

  const handleEditSubmit = (item: Comment, updatedContent: string) => {
    setCommentsList((prevItems) =>
      prevItems.map((comment) =>
        comment.id === item.id
          ? { ...comment, content: updatedContent }
          : comment,
      ),
    );
  };

  const handleDeleteClick = (commentId: string) => {
    setCommentsList((prevItems) =>
      prevItems.filter((item) => item.id !== commentId),
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
