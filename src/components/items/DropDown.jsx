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
  const [selectedItemText, setSelectedItemText] = useState("최신순");

  /**
   * DropDown 메뉴 클릭 핸들러
   * @param {*} text
   * @param {*} value
   */
  const onSelectItem = (text, value) => {
    setIsOpen(false);
    setSelectedItemText(text);
    setOrder(value);
  };

  return (
    <div className="sort-area">
      <button
        type="button"
        className="btn-sort"
        onClick={() => setIsOpen((prev) => !prev)} // DropDown 토글
      >
        <span className="mo-hidden">{selectedItemText}</span>
      </button>
      {isOpen && (
        <div className="options">
          {sortOptions.map(({ text, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSelectItem(text, value)}
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
