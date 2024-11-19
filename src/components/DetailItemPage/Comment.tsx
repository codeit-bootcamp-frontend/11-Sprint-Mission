import React, { useState } from "react";
import { FormatDateAgo } from "../../util/FormatDate";
import dropdown from "../../assets/image/Group 33735.png";
import profile from "../../assets/image/size=large.png";

interface CommentComponentProps {
  comment: CommentProps;
  isEditing: boolean;
  onEditClick: (comment: CommentProps) => void;
  onEditSave: (id: number, content: string) => void;
  onEditCancel: () => void;
  activeDropdown: number | null;
  onDropdownToggle: (id: number) => void;
}

interface CommentProps {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}

const Comment = ({
  comment,
  onEditClick,
  isEditing,
  onEditSave,
  onEditCancel,
  activeDropdown,
  onDropdownToggle,
}: CommentComponentProps) => {
  const [editedContent, setEditedContent] = useState<string>(comment.content); // 수정할 내용
  return (
    <li key={comment.id} className="comments-list">
      <div className="comments-content-box">
        {/* 수정하려는 id 와 해당 id가 같으면 UI 나타내기 */}
        {isEditing && (
          <div className="update-input-box">
            <textarea
              className="update-input"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="edit-button-box">
              <button className="cancel-button" onClick={onEditCancel}>
                취소
              </button>
              <button
                className="edit-button"
                onClick={() => onEditSave(comment.id, editedContent)}
              >
                수정 완료
              </button>
            </div>
          </div>
        )}
        {/* 수정하려는 id 와 해당 id가 다르면 UI 나타내기 */}
        {!isEditing && (
          <>
            <p>{comment.content}</p>
            <img
              className="dropdown-image"
              src={dropdown}
              alt="수정/삭제 버튼 드롭다운"
              onClick={() => onDropdownToggle(comment.id)}
            />
          </>
        )}
        {activeDropdown === comment.id && (
          <div className="dropdown-menu">
            <button
              className="dropdown-text"
              onClick={() => onEditClick(comment)}
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
          src={profile}
          alt="사용자 프로필 이미지"
        />
        <div>
          <h3 className="writer-nickname">{comment.writer.nickname}</h3>
          <p className="write-time">{FormatDateAgo(comment.updatedAt)}</p>
        </div>
      </div>
    </li>
  );
};

export default Comment;
