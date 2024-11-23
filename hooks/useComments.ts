import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CommentType } from '@/types/types';

const useComments = () => {
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { productId } = router.query as { productId?: string };

  useEffect(() => {
    const loadComments = async () => {
      if (!productId) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ list: CommentType[] }>(
          `/api/comments?productId=${productId}`
        );
        setCommentsList(response.data.list);
      } catch (err) {
        setError((err as any).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [productId]);

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
};

export default useComments;
