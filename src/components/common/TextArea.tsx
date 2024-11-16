import React, { ChangeEvent, useState } from "react";
import "../css/TextArea.css";

interface TextareaProps {
  id?: string; // 고유 ID
  value?: string; // textarea의 값
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void; // onChange 이벤트 핸들러
  placeholder?: string; // 자리 표시자 (선택적)
  label?: string; // 라벨 (선택적)
  rows?: number; // 행 수 (선택적, 기본값: 4)
  cols?: number; // 열 수 (선택적, 기본값: 50)
}

const Textarea = ({
  id,
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  cols = 50,
}: TextareaProps) => {
  const [text, setText] = useState(value || "");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className="textarea-label">
          {label}
        </label>
      )}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        className="textarea-box"
      />
    </>
  );
};

export default Textarea;
