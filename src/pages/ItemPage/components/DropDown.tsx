import React from "react";

function DropDown({ onSortSelection }) {
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
