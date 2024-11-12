import React, { useState } from "react";
import "./ItemCommentForm.css";

const FORM_COMMENT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

function CommentForm({ productId }) {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComment("");
  };

  const isButtonDisabled = !comment.trim();

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <h2 className="commentTitle">문의하기</h2>
      <textarea
        id="comment"
        className="commentTextarea"
        value={comment}
        onChange={handleInputChange}
        placeholder={FORM_COMMENT_PLACEHOLDER}
      />
      <button
        className="submitButton"
        type="submit"
        disabled={isButtonDisabled}
        style={{
          backgroundColor: isButtonDisabled ? "#9ca3af" : "#3692FF",
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
        }}
      >
        등록
      </button>
    </form>
  );
}

export default CommentForm;
