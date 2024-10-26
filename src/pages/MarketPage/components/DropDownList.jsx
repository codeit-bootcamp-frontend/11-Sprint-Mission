import React from "react";
import "./DropDownList.css";

function DropDownList({ onSortCard}) {
  return (
    <div className="dropdownList">
      <div className="dropdownItem" onClick={() => onSortCard("recent")}>
        최신순
      </div>
      <div className="dropdownItem" onClick={() => onSortCard("favorite")}>
        좋아요순
      </div>
    </div>
  );
}
export default DropDownList;