import { useState } from "react";
import "./Dropdown.css";
import DropdownIcon from "../images/ic_arrow_down.svg";

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
        <span>{selectedItem}</span>
        <img src={DropdownIcon} alt="드롭다운 아이콘" />
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
