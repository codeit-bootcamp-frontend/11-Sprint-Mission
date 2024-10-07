import React from "react";

function PrimaryButton({ children, name, onClick }) {
  return (
    <button
      type="button"
      className={["btn-primary", name].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
