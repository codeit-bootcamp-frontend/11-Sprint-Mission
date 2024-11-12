import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

interface LoginButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const LoginButton = ({ isActive, onClick }: LoginButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isActive) {
      navigate("/items");
    }
    onClick();
  };

  return (
    <div className="login-button-box" onClick={handleClick}>
      <button className={`login-button ${isActive ? "active" : ""}`}>
        로그인
      </button>
    </div>
  );
};

export default LoginButton;
