import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputFieldProps {
  id: string;
  label?: string;
  type: "text" | "password" | "email" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}: InputFieldProps) => {
  return (
    <div className="inputField">
      {label && (
        <label className="inputLabel" htmlFor={id}>
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className="inputTextarea"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="inputText"
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      )}
    </div>
  );
};

export default InputField;
