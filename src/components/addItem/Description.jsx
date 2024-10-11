import React from "react";

function Description({ children, name, placeholder, setUserInput }) {
  const handleInput = ({ target }) => {
    setUserInput((prev) => ({ ...prev, description: target.value }));
  };
  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <textarea
        id={`item_${name}`}
        placeholder={placeholder}
        onChange={handleInput}
        required
      />
    </div>
  );
}

export default Description;
