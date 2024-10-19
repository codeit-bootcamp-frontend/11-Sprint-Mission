import React, { useState } from "react";
import "./css/Pagenation.css";

const BUTTONS = [1, 2, 3, 4, 5];

const Pagenation = ({ onClickPage }) => {
  const [button, setButton] = useState(BUTTONS);

  const onClickPageCursor = (e) => {
    const button = e.target.value;
    setButton(button);
    onClickPage(e);
  };

  const handleClickPage = (e) => {
    const pageNo = e.target.value;
    onClickPage(pageNo);
  };

  return (
    <div className="pagination-area">
      <button
        className="button-left"
        onClick={onClickPageCursor}
        value={button[0] - 1}
        disabled
      />
      {button.map((button) => (
        <button
          key={button}
          className="button-num"
          onClick={handleClickPage}
          value={button}
        >
          {button}
        </button>
      ))}
      <button
        className="button-right"
        onClick={onClickPageCursor}
        value={button[4] + 1}
        disabled
      />
    </div>
  );
};

export default Pagenation;
