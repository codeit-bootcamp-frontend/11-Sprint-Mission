import React from "react";

function TextInput({ children, name, placeholder, value, dispatch }) {
  const setName = (value) => dispatch({ type: "SET_NAME", payload: value });

  const handleInput = ({ target }) => setName(target.value);

  const handleBlur = ({ target }) => setName(target.value.trim());

  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onBlur={handleBlur}
        onChange={handleInput}
        required
      />
    </div>
  );
}

export default TextInput;
