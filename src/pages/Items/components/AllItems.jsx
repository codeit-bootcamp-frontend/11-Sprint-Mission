import React, { useState } from "react";
import AllItem from "./AllItem";
import glass from "../../../shared/assets/glass.svg";
import selectButton from "../../../shared/assets/selectButton.svg";
import { Link } from "react-router-dom";

const AllItems = ({
  data,
  allDisplayCount,
  handleSortChange,
  sortBy,
  setSortBy,
}) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const handleOptionClick = (value) => {
    setSortBy(value);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };
  return (
    <div className="w-full p-2 sm:flex  flex-col gap-y-3 lg:w-2/3 lg:justify-center">
      <div className="hidden sm:flex mt-4 items-center justify-between">
        <h2 className="text-base font-bold">전체 상품</h2>
        <div className="flex items-center gap-x-3 ">
          <div className="relative flex gap-x-3">
            <input
              className="p-2 pl-6 h-9 w-30 border rounded-lg bg-[#F3F4F6]"
              placeholder="검색할 상품을 입력해주세요"
            />{" "}
            <img className="absolute left-1 top-3" src={glass} />
          </div>
          <Link to="/addItem">
            <button className="h-9 w-24 text-xs text-white p-1 rounded-lg bg-[#3692FF] ">
              상품 등록하기
            </button>
          </Link>

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
        </div>
      </div>

      {/* sm미만 */}
      <div className="flex mt-4 gap-y-2 items-center flex-col sm:hidden">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-base font-bold">전체 상품</h2>
          <Link to="/addItem">
            <button className="h-9 w-24 text-xs text-white p-1 rounded-lg bg-[#3692FF] ">
              상품 등록하기
            </button>
          </Link>
        </div>

        <div className="flex  w-full justify-between items-center gap-x-3  mb-1">
          <div className="relative w-full flex gap-x-3">
            <input
              className="p-2 pl-8 rounded-lg  h-9 w-5/6 bg-[#F3F4F6]"
              placeholder="검색할 상품을 입력해주세요"
            />{" "}
            <img className="absolute left-1 top-3" src={glass} />
          </div>

          <div className="relative">
            <button
              className="w-12 flex justify-center border rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img className="w-2/3" src={selectButton}></img>
            </button>
            {isOpen && (
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
            )}
          </div>
        </div>
      </div>
      {/* 상품 목록을 표시하는 부분 */}
      <div className="mt-1 grid grid-cols-2 sm:mt-0 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.list.slice(0, allDisplayCount).map((product) => (
          <AllItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default AllItems;
