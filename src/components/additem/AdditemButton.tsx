import React from 'react';
import styles from '../../styles/additem/additem.module.css';

interface AdditemButtonProps {
  onSubmit: () => void;
  disabled?: boolean;
}

const AdditemButton = ({ onSubmit, disabled }: AdditemButtonProps) => {
  return (
    <button
      className={`${styles.upButton} ${
        disabled ? styles.disabled : styles.active
      }`}
      onClick={onSubmit}
      disabled={disabled}
    >
      등록
    </button>
  );
};

export default AdditemButton;
