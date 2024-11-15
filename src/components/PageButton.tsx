import React, {ReactNode} from 'react';
import './PageButton.css';

interface PageButtonProps {
  children ?: ReactNode;
  clickBtn:() => void;
}

function PageButton({ children, clickBtn }: PageButtonProps) {
  return (
    <button onClick={clickBtn} className="page-button">
      <div>{children}</div>
    </button>
  );
}

export default PageButton;
