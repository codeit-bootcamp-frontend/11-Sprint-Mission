import { useState } from "react";
import "./DropDownbtn.css";
import downIcon from "../images/dropdown/downicon.png";

const DropDownbtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((currentState) => !currentState);
  };

  return (
    <div className="dd-con">
      <div className="dd-box" onClick={toggleDropdown}>
        <p>최신순</p>
        <div className="d-icon">
          <img src={downIcon} alt="다운아이콘" />
        </div>
      </div>
      {isOpen && (
        <div className="dd-list">
          <button className="newbtn">최신순</button>
          <button className="goodbtn">좋아요순</button>
        </div>
      )}
    </div>
  );
};

export default DropDownbtn;
