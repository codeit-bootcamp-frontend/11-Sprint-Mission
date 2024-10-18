import React, { useState } from "react";
import DropDownInquiry from "./DropDownInquiry";
import { calculateGapTime } from "utils/formatDate";
import { updateComment } from "utils/api";

function DetailInquiry({ id, content, writer, updatedAt }) {
  const [isEditing, setIsEditing] = useState(false); // 수정 상태를 할당할 state
  const [comment, setComment] = useState(content); // 문의하기 text를 할당할 state

  /**
   * 취소 버튼 클릭 시 comment에 부모에서 받은 content를 할당
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setComment(content);
  };

  /**
   * save하면 서버에 request 보내고 response 받아서 commnets 업데이트
   */
  const handleSaveEdit = async () => {
    try {
      const response = await updateComment(id, { content: comment }); // Jwt Token 추가 예정
      const data = await response.json(); // 서버에서 받은 response로 새 댓글 추가하는 기능은 추후 추가
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-inquiry">
      {!isEditing && <DropDownInquiry setIsEditting={setIsEditing} />}
      <div className="inquiry-comment">
        {isEditing ? (
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
            <div className="date-update">{calculateGapTime(updatedAt)}</div>
          </div>
        </div>
        {isEditing && (
          <div className="edit-area">
            <button className="btn-cancel" onClick={handleCancelEdit}>
              취소
            </button>
            <button className="btn-edit" onClick={handleSaveEdit}>
              수정 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailInquiry;
