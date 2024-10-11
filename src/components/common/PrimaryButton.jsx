import React from "react";

function PrimaryButton({ children, type = "button", name, disabled, onClick }) {
  return (
    <button
      type={type}
      className={["btn-primary", name].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
