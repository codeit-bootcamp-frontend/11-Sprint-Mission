import { useState } from "react";

const Dropdown = ({ setOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedITem] = useState("최신순");

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = async (item) => {
    setIsOpen(false);
    setSelectedITem(item);
    setOrder(item === "최신순" ? "recent" : "favorite");
  };

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={handleDropdown}>
        {selectedItem}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {/* 클릭 할 때만 핸들러 호출 */}
          <li onClick={() => handleItemClick("최신순")}>최신순</li>
          <li onClick={() => handleItemClick("좋아요순")}>좋아요순</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
