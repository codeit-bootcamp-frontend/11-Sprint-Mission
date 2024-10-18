import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCommentsById, updateCommentsById } from "../api/api";
import "../css/CommentsList.css";
import { FormatDateAgo } from "./FormatDate";

const CommentsList = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(100);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editedContent, setEditedContent] = useState(""); // 수정할 내용

  useEffect(() => {
    const fetchCommentsById = async () => {
      try {
        setLoading(true);
        const result = await getCommentsById(productId, {
          limit: limit,
        });
        setComments(result.list);
        console.log(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsById();
  }, [productId, limit]);

  const handleDropdownToggle = (commentId) => {
    console.log(commentId);
    if (activeDropdown === commentId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(commentId);
    }
  };

  const handleEditClick = (comment) => {
    //수정하기 클릭 이벤트
    console.log(comment);
    setEditingCommentId(comment.id); // 수정할 댓글 ID 설정
    setEditedContent(comment.content);
    setActiveDropdown(null); // 드롭다운 닫기
  };

  const handleEditCancel = () => {
    //수정 취소 이벤트
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleEditSave = async (commentId) => {
    //수정 완료 이벤트
    try {
      await updateCommentsById(commentId, { content: editedContent });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );
      setEditingCommentId(null); // 수정 모드 종료
      setEditedContent(""); // 수정 내용 초기화
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="comments-list">
              <div className="comments-content-box">
                {/* 수정 중인지 확인 후 UI 나타내기 */}
                {editingCommentId === comment.id ? (
                  <div className="update-input-box">
                    <textarea
                      className="update-input"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <div className="edit-button-box">
                      <button
                        className="cancel-button"
                        onClick={handleEditCancel}
                      >
                        취소
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => handleEditSave(comment.id)}
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>{comment.content}</p>
                    <img
                      className="dropdown-image"
                      src="/assets/Group 33735.png"
                      alt="수정/삭제 버튼 드롭다운"
                      onClick={() => handleDropdownToggle(comment.id)}
                    />
                  </>
                )}
                {activeDropdown === comment.id && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-text"
                      onClick={() => handleEditClick(comment)}
                    >
                      수정하기
                    </button>
                    <button className="dropdown-text">삭제하기</button>
                  </div>
                )}
              </div>
              <div className="comments-writer-box">
                <img
                  className="writer-profile"
                  src="/assets/size=large.png"
                  alt="사용자 프로필 이미지"
                />
                <div>
                  <h3 className="writer-nickname">{comment.writer.nickname}</h3>
                  <p className="write-time">
                    {FormatDateAgo(comment.updatedAt)}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="no-question-box">
            <img
              className="no-question-image"
              src="/assets/Group 33739.png"
              alt="아직 문의가 없는 팬더 사진"
            />
            <p className="no-question-text">아직 문의가 없어요</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
