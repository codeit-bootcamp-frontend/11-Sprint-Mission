import React from "react";

function TextInput({ children, name, placeholder }) {
  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input id={`item_${name}`} type="text" placeholder={placeholder} />
    </div>
  );
}

export default TextInput;
