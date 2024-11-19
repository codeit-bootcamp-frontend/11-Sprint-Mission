import React, {ButtonHTMLAttributes} from 'react';
import './PageButton.css';

interface PageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: number;
  clickBtn: () => void;
}

function PageButton({ value, clickBtn, ...rest }: PageButtonProps) {
  return (
    <button {...rest} onClick={clickBtn} className="page-button">
      {value}
    </button>
  );
}

export default PageButton;
