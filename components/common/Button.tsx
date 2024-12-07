import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  addClassName?: string | string[];
  handleClick?: () => void;
}

function Button({
  children,
  addClassName,
  handleClick,
  ...props
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
        {...props}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
