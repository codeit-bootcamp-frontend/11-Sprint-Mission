import React, { useEffect, useState } from "react";
import { fetchComments } from "../../../api/itemsApi"; // fetchComments 함수 경로에 맞게 수정
import { useParams } from "react-router-dom";
import commentDefault from "../../../images/icons/commentDefault.svg";
import "./ItemCommentList.css";

function CommentList() {
  const { productId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetchComments(productId, { page: 1, limit: 10 });
        if (response && Array.isArray(response.list)) {
          setComments(response.list);
          console.log("Comments data:", response.list);
        } else {
          console.error("댓글 데이터가 올바르지 않습니다:", response);
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    if (productId) {
      loadComments();
    }
  }, [productId]);

  if (comments.length === 0) return <div>댓글이 없습니다.</div>;

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <img
            src={comment.image || commentDefault}
            alt={`${comment.nickname}의 프로필 이미지`}
            className="commentUserImage"
          />
          <div>
            <h4>{comment.nickname}</h4>
            <p>{comment.content}</p>
            <span>{new Date(comment.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
