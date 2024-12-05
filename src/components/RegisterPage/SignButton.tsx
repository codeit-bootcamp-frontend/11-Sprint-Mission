import React from "react";
import "./SignButton.css";

interface SignButtonProps {
  isActive: boolean;
}

const SignButton = ({ isActive }: SignButtonProps) => {
  return (
    <div className="sign-button-box">
      <button
        type="submit"
        className={`sign-button ${isActive ? "active" : ""}`}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignButton;
