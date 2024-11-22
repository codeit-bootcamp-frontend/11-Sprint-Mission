import { useState, useEffect } from 'react';
import './ProductComment.css';
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from '../api/ProductAPI';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Comment } from '../types/Comment';

type ProductCommentProps = {
  productId: string;
};

function ProductComment({ productId }: ProductCommentProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const productIdNumber = Number(productId);

  useEffect(() => {
    if (!productIdNumber) {
      console.log(
        '유효하지 않은 상품ID입니다. 댓글 데이터를 가져올 수 없습니다.'
      );
      return;
    }
    const fetchComments = async () => {
      try {
        const data: Comment[] = await getComments(productIdNumber);
        setComments(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };

    fetchComments();
  }, [productIdNumber]);

  // 댓글 추가
  const handleAddComment = async (newContent: string) => {
    try {
      const newComment = await addComment(productIdNumber, newContent);
      setComments([newComment, ...comments]);
    } catch (err) {
      if (err instanceof Error) {
        console.error('댓글 추가 실패:', err.message);
      }
    }
  };

  // 댓글 수정
  const handleEditComment = async (
    commentId: number,
    updatedContent: string
  ) => {
    try {
      await editComment(commentId, updatedContent);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: updatedContent }
            : comment
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error('댓글 수정 실패:', err.message);
      }
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error('댓글 삭제 실패:', err.message);
      }
    }
  };

  return (
    <div className="product-inquiry">
      <CommentForm onSubmit={handleAddComment} />
      <div className="inquiry-list">
        {comments.map((comment) => (
          <CommentList
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductComment;
