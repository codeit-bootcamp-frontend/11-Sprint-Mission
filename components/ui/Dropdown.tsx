import React, { useState } from "react";
// import "./Dropdown.css";
import SortIcon from "../../public/images/ic_sort.svg";
import Image from "next/image";

interface DropdownProps {
  onSortSelection: (sortOption: any) => void;
  sortOptions: { key: string; label: string }[];
}

function Dropdown({ onSortSelection, sortOptions }: DropdownProps) {
  const [isDropdownView, setIsDropdownView] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownView(!isDropdownView);
  };

  return (
    <div>
      <button onClick={toggleDropdown}>
        <Image src={SortIcon} alt="Sort Icon" width={24} height={24} />
      </button>

      {isDropdownView && (
        <div>
          {/* <div
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
          </div> */}
          {sortOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => {
                onSortSelection(option.key);
                setIsDropdownView(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
