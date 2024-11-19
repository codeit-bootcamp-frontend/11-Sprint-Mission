import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import EditMessage from './EditMessage';
import './Comments.css';

interface Writer {
  image: string;
  nickname: string;
}

export interface CommentData {
  id: string;
  content: string;
  writer: Writer;
  updatedAt: string | number | Date;
}

interface CommentProps {
  comment: CommentData;
  onDelete: (id: string) => void;
}

function formatDate(value: string | number | Date): string {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function Comment({ comment, onDelete }: CommentProps) {
  const [selected, setSelected] = useState('옵션');
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(comment?.content); // 현재 댓글 내용

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelected(value);
    if (value === 'edit') {
      setIsEditing(true); // 수정할 때
    } else if (value === 'delete') {
      onDelete(comment.id); // 삭제할 때
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // 수정을 취소할 때
  };

  const handleSubmit = (newContent: string) => {
    setCurrentContent(newContent); // 수정 내용 업뎃
    setIsEditing(false); // 완료 후 원래 창으로 전환
  };

  return (
    <div className="comment">
      <div className="comment-head">
        {!isEditing ? (
          <p className="question">{currentContent}</p>
        ) : (
          <EditMessage currentContent={currentContent} onCancel={handleCancel} onSubmit={handleSubmit} />
        )}
        <div className="form">
          {!isEditing && (
            <form>
              <label htmlFor="textOption"></label>
              <select id="textOption" onChange={handleSelect} value={selected} className="select-text">
                <option value="" className="select-option">
                  옵션
                </option>
                <option value="edit" className="select-option">
                  수정하기
                </option>
                <option value="delete" className="select-option">
                  삭제하기
                </option>
              </select>
            </form>
          )}
        </div>
      </div>
      <div className="comment-bottom">
        <img src={comment?.writer.image} alt="프로필사진" className="profile-img" />
        <div className="buyer-info">
          <p className="buyer-nickname">{comment?.writer.nickname}</p>
          <p className="comment-updatedAt">{formatDate(comment?.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;