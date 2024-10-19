import React from 'react';

function RemoveButton({ onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      X
    </button>
  );
}

export default RemoveButton;
