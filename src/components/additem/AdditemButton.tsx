import React from 'react';

interface AdditemButtonProps {
  onSubmit: () => void;
  disabled?: boolean;
}

const AdditemButton: React.FC<AdditemButtonProps> = ({
  onSubmit,
  disabled,
}) => {
  return (
    <button
      className={`upButton ${disabled ? 'disabled' : 'active'}`}
      onClick={onSubmit}
      disabled={disabled}
    >
      등록
    </button>
  );
};

export default AdditemButton;
