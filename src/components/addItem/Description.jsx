import React from "react";

function Description({ children, name, value, placeholder, dispatch }) {
  const setDescription = (value) =>
    dispatch({ type: "SET_DESCRIPTION", payload: value });

  const handleInput = ({ target }) => setDescription(target.value);

  const handleBlur = ({ target }) => setDescription(target.value.trim());
  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <textarea
        id={`item_${name}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        required
      />
    </div>
  );
}

export default Description;
