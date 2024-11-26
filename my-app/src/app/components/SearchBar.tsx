import Image from "next/image";
import { useState } from "react";

interface SearchBarProps {
  onSortChange: (orderBy: string) => void;
  onSearch: (keyword: string) => void;
}

export default function SearchBar({ onSortChange, onSearch }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = (e: React.MouseEvent) => {
    setIsOpen(!isOpen);
    e.stopPropagation();
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div className="flex items-center gap-[12px] mt-[16px]">
      <div className="relative flex items-center flex-1">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-[20px]">
          <div className="w-[15px] h-[15px] relative">
            <Image src="/icon/search_icon.png" fill alt="search_icon" />
          </div>
        </div>
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={handleInputClick}
          className="w-full bg-gray100 pt-[9px] pb-[9px] pl-[44px] pr-0 rounded-xl	"
          type="text"
          placeholder="검색할 상품을 입력해주세요"
        />
      </div>
      <button
        className="md:w-[130px] w-[42px] h-[42px] relative rounded-xl border border-solid border-gray200"
        onClick={toggleDropdown}
      >
        <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[16px] h-[14px] relative">
            <Image src="/icon/drop_down_icon.png" fill alt="drop down icon" />
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center gap-[24px]">
          <p>최신순</p>
          <div className="w-[15px] h-[7px] relative">
            <Image src="/icon/down_icon.png" fill alt="down_icon" />
          </div>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } flex flex-col w-[90px] absolute top-[45px] left-[-48px] border border-solid border-gray200 z-10 bg-background`}
        >
          <button
            onClick={() => onSortChange("recent")}
            className="p-2.5 border-b border-gray-300"
          >
            최신순
          </button>
          <button onClick={() => onSortChange("like")} className="p-2.5 ">
            좋아요순
          </button>
        </div>
      </button>
    </div>
  );
}
