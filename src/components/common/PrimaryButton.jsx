import React from "react";

function PrimaryButton({ children, type = "button", name, onClick }) {
  return (
    <button
      type={type}
      className={["btn-primary", name].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
