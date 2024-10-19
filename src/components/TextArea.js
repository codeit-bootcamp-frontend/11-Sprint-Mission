import React, { useState } from "react";
import "./css/TextArea.css";

const Textarea = ({
  id,
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  cols = 50,
}) => {
  const [text, setText] = useState(value || "");

  const handleChange = (e) => {
    setText(e.target.value);
    onChange(e);
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
