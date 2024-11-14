import React, { MouseEvent, useState } from "react";
import "../css/Pagenation.css";

const BUTTONS = [1, 2, 3, 4, 5];

interface Props {
  onClickPage: (e: MouseEvent, pageNo: number) => void;
}

const Pagenation = ({ onClickPage }: Props) => {
  // eslint-disable-next-line
  const [button, setButton] = useState(BUTTONS);

  const onClickPageCursor = (e: MouseEvent) => {
    // const button = (e.target as HTMLButtonElement).value;
    // setButton(button);
    onClickPage(e, 1);
  };

  const handleClickPage = (e: MouseEvent) => {
    const pageNo = (e.target as HTMLButtonElement).value;
    onClickPage(e, Number(pageNo));
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
