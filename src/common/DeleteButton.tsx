import React from "react";
import deleteButton from "../assets/image/ic_X.png";

interface DeleteButtonProps {
  onClick: () => void;
  altText: string;
  className?: string;
}

const DeleteButton = ({ onClick, altText, className }: DeleteButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      <img src={deleteButton} alt={altText} />
    </button>
  );
};

export default DeleteButton;
