import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAsyncRequest from './useAsyncRequest';

const useComments = (fetchCommentsFunction) => {
  const [commentsList, setCommentsList] = useState([]);
  const { execute, isLoading, error } = useAsyncRequest();
  const { productId } = useParams();

  useEffect(() => {
    const handleCommentsListLoad = async () => {
      const result = await execute(() => fetchCommentsFunction(productId));
      if (result) {
        const { list } = result;
        setCommentsList(list);
      }
    };

    handleCommentsListLoad();
  }, [productId, execute, fetchCommentsFunction]);

  const handleEditSubmit = (item, updatedContent) => {
    setCommentsList((prevItems) =>
      prevItems.map((comment) =>
        comment.id === item.id
          ? { ...comment, content: updatedContent }
          : comment,
      ),
    );
  };

  const handleDeleteClick = (itemToDeleteId) => {
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
