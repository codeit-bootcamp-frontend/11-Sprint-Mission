import React from "react";

interface InputItemProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // input 또는 textarea에서 발생하는 변경 이벤트를 모두 처리
  ) => void;
  placeholder: string;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> // input 또는 textarea에서 발생하는 변경 이벤트를 모두 처리
  ) => void;
  isTextArea?: boolean;
}

function InputItem({
  id,
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
}: InputItemProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown} // textarea에서도 onKeyDown 이벤트 처리?
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default InputItem;
