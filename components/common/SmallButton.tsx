import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '@/styles/Common.module.css';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function SmallButton({ children, ...rest }: ButtonProp) {
  return (
    <>
      <button className={styles.smallButton} {...rest}>
        <div className={styles.smallButtonText}>{children}</div>
      </button>
    </>
  );
}

export default SmallButton;
