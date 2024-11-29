import React, { ChangeEvent, KeyboardEvent } from "react";
import styles from "./InputField.module.css";

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
    <div className={styles.inputField}>
      {label && (
        <label className={styles.inputLabel} htmlFor={id}>
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className={styles.inputTextarea}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={styles.inputText}
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
