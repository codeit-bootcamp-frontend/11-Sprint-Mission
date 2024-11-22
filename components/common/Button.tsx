import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children?: ReactNode;
  addClassName?: string | string[];
  handleClick?: () => void;
  disabled: boolean;
}

function Button({
  children,
  addClassName,
  handleClick,
  disabled,
}: ButtonProps) {
  const buttonClass = Array.isArray(addClassName)
    ? addClassName.join(' ')
    : addClassName || '';

  return (
    <>
      <button
        type="button"
        className={`${styles.button} ${buttonClass}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
