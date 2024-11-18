import React, { ReactNode } from "react";
import "../css/Button.css";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // onClick 이벤트 핸들러
  children: ReactNode; // 버튼 내부의 자식 요소
  className?: string; // CSS 클래스 (선택적)
  disabled?: boolean; // 비활성화 여부 (선택적)
}

const Button = ({ onClick, children, className, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
