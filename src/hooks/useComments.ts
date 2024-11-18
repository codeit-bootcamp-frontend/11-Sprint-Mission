import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAsyncRequest from './useAsyncRequest';

interface Comment {
  id: string;
  productId: string;
  userId: string;
  content: string;
  createdAt: string;
}

type FetchCommentsFunction = (
  productId: string,
) => Promise<{ list: Comment[] }>;

interface UseCommentsReturn {
  commentsList: Comment[];
  isLoading: boolean;
  error: Error | null;
  handleEditSubmit: (item: Comment, updatedContent: string) => void;
  handleDeleteClick: (itemToDeleteId: string) => void;
}

const useComments = (
  fetchCommentsFunction: FetchCommentsFunction,
): UseCommentsReturn => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const { execute, isLoading, error } = useAsyncRequest();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const handleCommentsListLoad = async () => {
      if (!productId) return;
      const result = await execute(() => fetchCommentsFunction(productId));
      if (result) {
        const { list } = result;
        setCommentsList(list);
      }
    };

    handleCommentsListLoad();
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

  const handleDeleteClick = (itemToDeleteId: string) => {
    setCommentsList((prevItems) =>
      prevItems.filter((item) => item.id !== itemToDeleteId),
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
