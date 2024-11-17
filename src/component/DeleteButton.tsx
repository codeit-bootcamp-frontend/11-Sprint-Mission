import React from "react";
import { ReactComponent as CloseIcon } from "../images/ic_close.svg";

function DeleteButton({ onClick, label }) {
  return (
    <button aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </button>
  );
}

export default DeleteButton;
