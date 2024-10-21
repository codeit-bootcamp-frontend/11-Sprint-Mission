import React, { useState } from "react";

function PrimaryButton({ children, type = "button", name, disabled, onClick }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      type={type}
      className={["btn-primary", name, isHover ? "hover" : null].join(" ")}
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
