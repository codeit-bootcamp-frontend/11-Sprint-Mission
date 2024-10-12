import React, { useState } from "react";
import "./Pagenation.css";

const BUTTONS = [1, 2, 3, 4, 5];

const Pagenation = ({ totalCount, onPage, onClickPage }) => {
  const [button, setButton] = useState(BUTTONS);

  const onClickPageCursor = (e) => {
    const button = e.target.value;
    setButton(button);
    onClickPage(e);
  };

  return (
    <div className="button-Area">
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
          onClick={onClickPage}
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
