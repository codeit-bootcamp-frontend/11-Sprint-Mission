import React from "react";

function DropDownList({ onSortCard}) {
  return (
    <div>
      <div onClick={() => onSortCard("recent")}>
        최신순
      </div>
      <div onClick={() => onSortCard("favorite")}>
        좋아요순
      </div>
    </div>
  );
}
export default DropDownList;
