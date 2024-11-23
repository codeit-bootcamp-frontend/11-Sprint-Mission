import React, { useState } from "react";
// import "./Dropdown.css";
import SortIcon from "../public/images/ic_sort.svg";

interface DropdownProps {
  onSortSelection: (sortOption: "resent" | "favorite") => void;
}

function Dropdown({ onSortSelection }: DropdownProps) {
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
              onSortSelection("resent");
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
