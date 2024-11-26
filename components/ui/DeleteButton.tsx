import React from "react";
import CloseIcon from "../public/images/ic_close.svg";

interface DeleteButtonProps {
  onClick: () => void;
  label: string;
}

function DeleteButton({ onClick, label }: DeleteButtonProps) {
  return (
    <button aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </button>
  );
}

export default DeleteButton;
