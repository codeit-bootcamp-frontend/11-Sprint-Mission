import React from "react";
import "./LoginButton.css";

interface LoginButtonProps {
  isActive: boolean;
}

const LoginButton = ({ isActive }: LoginButtonProps) => {
  return (
    <div className="login-button-box">
      <button
        type="submit"
        className={`login-button ${isActive ? "active" : ""}`}
      >
        로그인
      </button>
    </div>
  );
};

export default LoginButton;
