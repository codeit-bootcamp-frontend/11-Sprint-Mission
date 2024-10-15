import React from "react";

const SelectOrderBy = ({ value, onChange }) => {
  return (
    <select className="option-select" value={value} onChange={onChange}>
      <option className="option" value="recent">
        최신순
      </option>
      <option className="option" value="favorite">
        좋아요순
      </option>
    </select>
  );
};

export default SelectOrderBy;
