import React from "react";
import { ReactComponent as DeleteIcon } from "../images/icons/delete.svg";
import "./DeleteButton.css";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button className="deleteButton" onClick={onClick}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
