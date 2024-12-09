import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '@/styles/Common.module.css';
import classNames from 'classnames';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: 'small' | 'medium' | 'large';
}

function Button({ children, size = 'small', ...rest }: ButtonProp) {
const buttonClass = classNames({
    [styles.smallButton]: size === 'small',
    [styles.mediumButton]: size === 'medium',
    [styles.largeButton]: size === 'large',
  });

  return (
    <>
      <button className={buttonClass} {...rest}>
        <div>{children}</div>
      </button>
    </>
  );
}

export default Button;
