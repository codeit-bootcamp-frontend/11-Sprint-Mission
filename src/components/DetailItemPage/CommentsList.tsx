import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  deleteCommentsById,
  getCommentsById,
  updateCommentsById,
} from "../../api/api";
import "./CommentsList.css";
import Comment from "./Comment";
import panda from "../../assets/image/Group 33739.png";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setComment } from "../../redux/commentSlice";
import { writer } from "repl";

const CommentsList = () => {
  const { productId } = useParams<{ productId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [limit, setLimit] = useState<number>(100);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글 ID
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(
    (state: RootState) => state.commentList.comments
  );
  const user = useSelector((state: RootState) => state.userInfo.user);
  const limit = 100;

  useEffect(() => {
    const fetchCommentsById = async () => {
      try {
        setLoading(true);
        const result = await getCommentsById(productId, {
          limit: String(limit),
        });
        dispatch(setComment(result.list));
        // setComments(result.list);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsById();
  }, [productId, limit, dispatch]);

  const handleDropdownToggle = (commentId: number) => {
    if (activeDropdown === commentId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(commentId);
    }
  };

  const handleEditClick = (commentId: number, writerId: number) => {
    if (writerId === user.id) {
      setEditingCommentId(commentId); // 수정 모드로 전환
      setActiveDropdown(null); // 드롭다운 닫기
    } else {
      setActiveDropdown(null);
      alert("본인의 댓글만 수정할 수 있습니다.");
    }
  };

  const handleEditCancel = () => {
    //수정 취소 이벤트
    setEditingCommentId(null);
  };

  const handleEditSave = async (commentId: number, editedContent: string) => {
    //수정 완료 이벤트
    try {
      await updateCommentsById(commentId, { content: editedContent });
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: editedContent }
          : comment
      );
      alert("댓글 수정 완료");
      dispatch(setComment(updatedComments));
      setEditingCommentId(null); // 수정 모드 종료
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleDeleteClick = async (commentId: number, writerId: number) => {
    //댓글 삭제 이벤트
    if (writerId !== user.id) {
      setActiveDropdown(null);
      alert("본인의 댓글만 삭제할 수 있습니다.");
      return;
    }
    try {
      await deleteCommentsById(commentId);
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      alert("댓글 삭제 완료");
      dispatch(setComment(updatedComments));
      setEditingCommentId(null); // 수정 모드 종료
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (comments.length === 0) {
    return (
      <div className="no-question-box">
        <img
          className="no-question-image"
          src={panda}
          alt="아직 문의가 없는 팬더 사진"
        />
        <p className="no-question-text">아직 문의가 없어요</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEditClick={() => handleEditClick(comment.id, comment.writer.id)}
            onDeleteClick={() =>
              handleDeleteClick(comment.id, comment.writer.id)
            }
            isEditing={editingCommentId === comment.id}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            activeDropdown={activeDropdown}
            onDropdownToggle={handleDropdownToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
