import React, { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import './EditMessage.css';

interface MessageProps {
  currentContent: string;
  onCancel: () => void;
  onSubmit: (editedcontent: string) => void;
}

function EditMessage({ currentContent, onCancel, onSubmit }: MessageProps) {
  const [editedContent, setEditedContent] = useState<string>(currentContent);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(editedContent); // 부모 컴포넌트에 전달
  };

  return (
    <div className="edit-message">
      <form onSubmit={handleSubmit}>
        <textarea value={editedContent} onChange={handleChange} className="edit-content" />
        <div className="button-option">
          <button type="button" onClick={onCancel} className="cancel-btn">
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
