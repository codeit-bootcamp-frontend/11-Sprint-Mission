import React from "react";
import "./DropList.css";

function DropList({ onSortSelection }) {
  return (
    <div className="dropList">
      <div className="dropItem" onClick={() => onSortSelection("recent")}>
     최신순
       </div>
      <div className="dropItem" onClick={() => onSortSelection("favorite")}>
     인기순
     </div>
    </div>
  );
}
export default DropList;
