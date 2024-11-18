import React, { MouseEvent, useState } from "react";
import "../css/Pagenation.css";

const BUTTONS = [1, 2, 3, 4, 5];

interface Props {
  onClickPage: (e: MouseEvent, pageNo: number) => void;
}

const Pagenation = ({ onClickPage }: Props) => {
  const handleClickPage = (e: MouseEvent) => {
    const pageNo = (e.target as HTMLButtonElement).value;
    onClickPage(e, Number(pageNo));
  };

  return (
    <div className="pagination-area">
      {BUTTONS.map((button) => (
        <button
          key={button}
          className="button-num"
          onClick={handleClickPage}
          value={button}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default Pagenation;
