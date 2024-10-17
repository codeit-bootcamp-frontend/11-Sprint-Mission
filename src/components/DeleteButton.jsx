import React from "react";
import { ReactComponent as DeleteIcon } from "../images/icons/delete.svg";
import "./DeleteButton.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="deleteButton" onClick={onClick}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
