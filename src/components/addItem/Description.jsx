import React from "react";

function Description({ children, name, placeholder }) {
  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <textarea id={`item_${name}`} placeholder={placeholder} />
    </div>
  );
}

export default Description;
