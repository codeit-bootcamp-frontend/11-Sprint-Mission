import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignButton.css";

interface SignButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const SignButton = ({ isActive, onClick }: SignButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isActive) {
      alert("회원가입이 정상적으로 완료되었습니다.");
      navigate("/login");
    }
    onClick();
  };
  return (
    <div className="sign-button-box" onClick={handleClick}>
      <button className={`sign-button ${isActive ? "active" : ""}`}>
        회원가입
      </button>
    </div>
  );
};

export default SignButton;
