import React, { useState } from "react";

const sortOptions = [
  {
    text: "최신순",
    value: "recent",
  },
  {
    text: "좋아요순",
    value: "favorite",
  },
];

function DropDown({ setOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortText, setSortText] = useState("최신순");

  /**
   * DropDown 메뉴 클릭 핸들러
   * @param {*} text
   * @param {*} value
   */
  const handleSelectClick = (text, value) => {
    setIsOpen(false);
    setSortText(text);
    setOrder(value);
  };

  return (
    <div className="sort-area">
      <button
        type="button"
        className="btn-sort"
        onClick={() => setIsOpen((prev) => !prev)} // DropDown 토글
      >
        <span className="mo-hidden">{sortText}</span>
      </button>
      <div className="options" open={isOpen}>
        {sortOptions.map(({ text, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => handleSelectClick(text, value)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DropDown;
