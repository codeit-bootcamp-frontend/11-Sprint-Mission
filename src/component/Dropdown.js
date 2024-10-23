import React, { useState } from "react";
// import "./Dropdown.css";
import { ReactComponent as SortIcon } from "../images/ic_sort.svg";

function Dropdown({ onSortSelection }) {
  const [isDropdownView, setIsDropdownView] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownView(!isDropdownView);
  };

  return (
    <div>
      <button onClick={toggleDropdown}>
        <SortIcon />
      </button>

      {isDropdownView && (
        <div>
          <div
            onClick={() => {
              onSortSelection("createdAt");
              setIsDropdownView(false);
            }}
          >
            최신순
          </div>
          <div
            onClick={() => {
              onSortSelection("favorite");
              setIsDropdownView(false);
            }}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
