import "./DropDownbtn.css";
import downIcon from "../images/dropdown/downicon.png";

const DropDownbtn = ({ order, isOpen, toggleDropdown, handleOrderChange }) => {
  return (
    <div className="dd-con">
      <div className="dd-box" onClick={toggleDropdown}>
        <p>{order === "recent" ? "최신순" : "좋아요순"}</p>
        <div className="d-icon">
          <img src={downIcon} alt="다운아이콘" />
        </div>
      </div>
      {isOpen && (
        <div className="dd-list">
          <button
            className="newbtn"
            onClick={() => handleOrderChange("recent")}
          >
            최신순
          </button>
          <button
            className="goodbtn"
            onClick={() => handleOrderChange("favorite")}
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownbtn;
