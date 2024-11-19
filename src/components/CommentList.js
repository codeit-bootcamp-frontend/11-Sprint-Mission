import { useState } from "react";
import "./CommentList.css";
import UserProfile from "./UserProfile";

function CommentList({ comment, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSaveEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
    setDropdownVisible(false);
  };

  return (
    <div className="inquiry-item">
      {isEditing ? (
        <textarea
          className="edit-input"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p className="inquiry-content">{comment.content}</p>
      )}

      <div className="comment-footer">
        <UserProfile
          nickname={comment.writer.nickname}
          timestamp={new Date(comment.updatedAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        />

        <div className="edit-buttons">
          {isEditing ? (
            <>
              <button
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setDropdownVisible(false);
                }}
              >
                취소
              </button>
              <button className="save-button" onClick={handleSaveEdit}>
                수정 완료
              </button>
            </>
          ) : (
            <div className="dropdown-container">
              <button
                className="dropdown-toggle"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                ⋮
              </button>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <button onClick={() => setIsEditing(true)}>수정하기</button>
                  <button onClick={() => onDelete(comment.id)}>삭제하기</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentList;
