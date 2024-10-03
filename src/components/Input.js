import React from "react";

function Input({ type }) {
  return (
    // className="input-area email"
    <div className={`input-area ${type}`}>
      <label htmlFor="input_email">이메일</label>
      <input
        type={type}
        id={`input_${type}`}
        placeholder="이메일을 입력해 주세요"
        data-valid="false"
        required
      />
      <span className="msg-error">에러 메시지</span>
    </div>
  );
}

export default Input;
