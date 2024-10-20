import React, { useState } from "react";
import style from "../css/dropdown.module.css";

const Dropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewestClick = () => {
    onSortChange("newest");
    setIsOpen(false);
  };

  const handleBestClick = () => {
    onSortChange("likes");
    setIsOpen(false);
  };

  return (
    <div className={style.dropdown}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={style.dropdownToggle}
      >
        최신순 &nbsp; ▾
      </button>
      {isOpen && (
        <ul className={style.dropdownMenu}>
          <li className={style.dropdownItem} onClick={handleNewestClick}>
            최신순{" "}
          </li>
          <li className={style.dropdownDivider}></li>
          <li className={style.dropdownItem} onClick={handleBestClick}>
            좋아요순
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
