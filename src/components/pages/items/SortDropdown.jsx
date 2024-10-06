import React, { useState } from "react";

function SortDropdown({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value, label) => {
    setSelectedOption(label);
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-select" onClick={toggleDropdown}>
        {selectedOption}
        <img
          src="/images/icons/ic_dropdown.svg"
          alt="드롭다운"
          className="dropdown-icon"
        />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li
            className="dropdown-item"
            onClick={() => handleOptionClick("recent", "최신순")}
          >
            최신순
          </li>
          <li
            className="dropdown-item"
            onClick={() => handleOptionClick("favorite", "좋아요순")}
          >
            좋아요순
          </li>
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
