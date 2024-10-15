import React from "react";

const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="inputField">
      {label && <label className="inputLabel">{label}</label>}
      {type === "textarea" ? (
        <textarea
          className="inputTextarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="inputText"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;
