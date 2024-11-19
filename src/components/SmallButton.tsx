import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './SmallButton.css';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function SmallButton({ children, ...rest }: ButtonProp) {
  return (
    <>
      <button className="small-button" {...rest}>
        <div className="small-btn-text">{children}</div>
      </button>
    </>
  );
}

export default SmallButton;
