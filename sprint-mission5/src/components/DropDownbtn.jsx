import "./DropDownbtn.css";
import downIcon from "../images/dropdown/downicon.png";

const DropDownbtn = ({
  order,
  isOpen,
  toggleDropdown,
  handleRcentClick,
  handleFavoriteClick,
}) => {
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
          <button className="newbtn" onClick={handleRcentClick}>
            최신순
          </button>
          <button className="goodbtn" onClick={handleFavoriteClick}>
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownbtn;
