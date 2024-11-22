import { useState, useEffect } from "react";
import "./ProductComment.css";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from "../api/ProductAPI";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function ProductComment() {
  const [comments, setComments] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    if (!productId) {
      console.log(
        "유효하지 않은 상품ID입니다. 댓글 데이터를 가져올 수 없습니다."
      );
      return;
    }
    const fetchComments = async () => {
      try {
        const data = await getComments(productId);
        setComments(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchComments();
  }, [productId]);

  // 댓글 추가
  const handleAddComment = async (newContent) => {
    try {
      const newComment = await addComment(productId, newContent);
      setComments([newComment, ...comments]);
    } catch (err) {
      console.error("댓글 추가 실패:", err.message);
    }
  };

  // 댓글 수정
  const handleEditComment = async (commentId, updatedContent) => {
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
      console.error("댓글 수정 실패:", err.message);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (err) {
      console.error("댓글 삭제 실패:", err.message);
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
