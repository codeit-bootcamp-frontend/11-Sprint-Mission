import { useState } from "react";
import "./EditMessage.css";

function EditMessage({ currentContent, onCancel, onSubmit }) {
  const [editedContent, setEditedContent] = useState(currentContent);

  const handleChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedContent); // 부모 컴포넌트에 전달
  };

  return (
    <div className="edit-message">
      <form onSubmit={handleSubmit}>
        <textarea
          value={editedContent}
          onChange={handleChange}
          className="edit-content"
        />
        <div className="button-option">
          <button onCancel={onCancel} className="cancel-btn">
            <div className="cancel-btn-text">취소</div>
          </button>
          <button type="submit" className="edited-btn">
            <div className="edited-btn-text">수정완료</div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMessage;
