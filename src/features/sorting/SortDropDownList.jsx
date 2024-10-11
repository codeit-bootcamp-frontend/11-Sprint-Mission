import React from "react";

const SortDropDownList = ({ handleOptionClick }) => {
  return (
    <ul className="absolute right-0 mt-1 w-28 border rounded-lg bg-white  shadow-lg z-10 text-sm">
      <li
        className="p-[2px] hover:bg-gray-200 cursor-pointer flex justify-center"
        onClick={() => handleOptionClick("recent")}
      >
        최신순
      </li>
      <li
        className="p-[2px] hover:bg-gray-200 cursor-pointer flex justify-center"
        onClick={() => handleOptionClick("favorite")}
      >
        좋아요순
      </li>
    </ul>
  );
};

export default SortDropDownList;
