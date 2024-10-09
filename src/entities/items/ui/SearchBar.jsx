import React from "react";
import glass from "../../../shared/assets/glass.svg";
const SearchBar = () => {
  return (
    <div className="relative flex gap-x-3">
      <input
        className="p-2 pl-6 h-9 w-30 border rounded-lg bg-[#F3F4F6]"
        placeholder="검색할 상품을 입력해주세요"
      />{" "}
      <img className="absolute left-1 top-3" src={glass} />
    </div>
  );
};

export default SearchBar;
