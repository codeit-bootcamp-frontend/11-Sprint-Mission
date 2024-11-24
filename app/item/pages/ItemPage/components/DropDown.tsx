import React from "react";

interface DropDownProps {
  onSortSelection: (option: string) => void;
}

function DropDown({ onSortSelection }: DropDownProps) {
  return (
    <div className="dropDown">
      <div className="dropDownMenu" onClick={() => onSortSelection("recent")}>
        최신순
      </div>
      <div className="dropDownMenu" onClick={() => onSortSelection("favorite")}>
        인기순
      </div>
    </div>
  );
}

export default DropDown;
