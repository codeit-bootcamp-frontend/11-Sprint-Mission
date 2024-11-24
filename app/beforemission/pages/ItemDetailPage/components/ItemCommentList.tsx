import React, { useEffect, useState } from "react";
import { fetchComments, Comment } from "../../../api/itemsApi";
import { useParams } from "react-router-dom";
import MoreDropDown from "./MoreDropDown";
import commentDefault from "../../../images/icons/commentDefault.svg";
import more from "../../../images/icons/more.svg";
import "./ItemCommentList.css";

function CommentList() {
  const { productId } = useParams<{ productId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isMoreDropDown, setIsMoreDropDown] = useState<number | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      if (!productId) return;
      try {
        const response = await fetchComments(Number(productId), {
          page: 1,
          limit: 10,
        });
        setComments(response.list);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    loadComments();
  }, [productId]);

  const toggleDropdown = (id: number) => {
    setIsMoreDropDown((prev) => (prev === id ? null : id));
  };

  const handleEdit = (commentId: number) => {
    alert(`${commentId} 댓글 수정`);
    setIsMoreDropDown(null);
  };

  const handleDelete = (commentId: number) => {
    alert(`${commentId} 댓글 삭제`);
    setIsMoreDropDown(null);
  };

  if (!comments.length) return <div>댓글이 없습니다.</div>;

  return (
    <div className="commentList">
      {comments.map((comment) => (
        <div key={comment.id} className="commentContainer">
          <button
            className="commentMoreButton"
            onClick={() => toggleDropdown(comment.id)}
          >
            <img src={more} alt="더보기" />
          </button>
          {isMoreDropDown === comment.id && (
            <MoreDropDown
              onEdit={() => handleEdit(comment.id)}
              onDelete={() => handleDelete(comment.id)}
            />
          )}
          <p className="commnetContent">{comment.content}</p>
          <div className="commentItem">
            <img
              src={comment.writer.image || commentDefault}
              alt={`${comment.writer.nickname}의 프로필 이미지`}
              className="commentUserImage"
            />
            <div>
              <h4>{comment.writer.nickname}</h4>
              <span>{new Date(comment.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
