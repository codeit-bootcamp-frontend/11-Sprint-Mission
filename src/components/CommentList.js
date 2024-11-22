import { useState } from "react";
import "./CommentList.css";
import UserProfile from "./UserProfile";

function EditButtons({ onCancel, onSave }) {
  return (
    <>
      <button className="cancel-button" onClick={onCancel}>
        취소
      </button>
      <button className="save-button" onClick={onSave}>
        수정 완료
      </button>
    </>
  );
}

function DropdownMenu({ onEdit, onDelete }) {
  return (
    <div className="dropdown-menu">
      <button onClick={onEdit}>수정하기</button>
      <button onClick={onDelete}>삭제하기</button>
    </div>
  );
}

function CommentList({ comment, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSaveEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
    setDropdownVisible(false);
  };

  const handleCancelEdit = () => {
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
            <EditButtons onCancel={handleCancelEdit} onSave={handleSaveEdit} />
          ) : (
            <div className="dropdown-container">
              <button
                className="dropdown-toggle"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                ⋮
              </button>
              {dropdownVisible && (
                <DropdownMenu
                  onEdit={() => setIsEditing(true)}
                  onDelete={() => onDelete(comment.id)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentList;
