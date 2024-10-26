import React from "react";

function DropDownList({ onSortCard}) {
  return (
    <div className="dropdownList">
      <div className="dropdownItem" onClick={() => onSortCard("recent")}>
        최신순
      </div>
      <div className="dropdownItem" onClick={() => onSortCard("favorite")}>
        인기순
      </div>
    </div>
  );
}
export default DropDownList;