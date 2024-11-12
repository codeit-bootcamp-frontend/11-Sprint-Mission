import React, { ChangeEvent } from "react";

interface SelectOrderByProps {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectOrderBy = ({ className, value, onChange }: SelectOrderByProps) => {
  return (
    <select className={className} value={value} onChange={onChange}>
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
