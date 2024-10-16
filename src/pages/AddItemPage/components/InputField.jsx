import React from "react";

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}) => {
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
