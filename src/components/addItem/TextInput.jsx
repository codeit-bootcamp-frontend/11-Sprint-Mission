import React from "react";

function TextInput({ children, name, placeholder, value, setUserInput }) {
  const handleInput = ({ target }) => {
    setUserInput((prev) => ({ ...prev, [name]: target.value }));
  };

  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        required
      />
    </div>
  );
}

export default TextInput;
