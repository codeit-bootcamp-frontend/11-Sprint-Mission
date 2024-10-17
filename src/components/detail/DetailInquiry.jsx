import React, { useState } from "react";
import DropDownInquiry from "./DropDownInquiry";
import { calculateGapHour } from "utils/formatDate";
// import { updateComment } from "utils/api";

function DetailInquiry({ id, content, writer, updatedAt }) {
  const INITIAL_COMMENT = content;
  const [isEditting, setIsEditting] = useState(false);
  const [comment, setComment] = useState(INITIAL_COMMENT);

  const handleCancel = () => {
    setIsEditting(false);
    setComment(INITIAL_COMMENT);
  };

  const handleEdit = () => {
    setIsEditting(false);
    // updateComment(id, { content: comment }); // Jwt Token 생성 후 추가 할 예정
  };

  return (
    <div className="content-inquiry">
      {!isEditting && <DropDownInquiry setIsEditting={setIsEditting} />}
      <div className="inquiry-comment">
        {isEditting ? (
          <textarea
            name="inquiry_comment"
            id="inquiry_comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
      <div className="inquiry-footer">
        <div className="user-area">
          <div className="writer-icon">
            <img src="/images/icons/ic_user_login.svg" alt={writer.nickname} />
          </div>
          <div>
            <div className="writer-name">{writer.nickname}</div>
            <div className="date-update">{calculateGapHour(updatedAt)}</div>
          </div>
        </div>
        {isEditting && (
          <div className="edit-area">
            <button className="btn-cancel" onClick={handleCancel}>
              취소
            </button>
            <button className="btn-edit" onClick={handleEdit}>
              수정 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailInquiry;
