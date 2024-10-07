import React from "react";

const SortSelect = ({ sortBy, handleSortChange }) => {
  return (
    <div>
      <select
        className="border h-9  w-20 p-1 rounded"
        id="sortBy"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
};

export default SortSelect;
