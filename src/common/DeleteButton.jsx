import React from "react";

const DeleteButton = ({ onClick, altText, className }) => {
  return (
    <button className={className} onClick={onClick}>
      <img src="/assets/ic_X.png" alt={altText} />
    </button>
  );
};

export default DeleteButton;
