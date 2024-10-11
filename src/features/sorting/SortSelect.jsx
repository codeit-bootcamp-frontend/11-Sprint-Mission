import React from "react";

const SortSelect = ({ orderBy, handlorderByChange }) => {
  return (
    <div>
      <select
        className="border h-9  w-20 p-1 rounded"
        id="orderBy"
        value={orderBy}
        onChange={handlorderByChange}
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
};

export default SortSelect;
