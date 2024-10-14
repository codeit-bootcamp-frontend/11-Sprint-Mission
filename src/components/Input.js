import React from "react";

const Input = ({ name, type, className, placeholder, label, onChange }) => {
  return (
    <div>
      <label className="product-label">{label}</label>
      <input
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
