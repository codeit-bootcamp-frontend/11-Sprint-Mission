import "./DropDownbtn.css";
import downIcon from "../images/dropdown/downicon.png";
import Mobiledowniocn from "../images/dropdown/m_downicon.png";
interface DropDownbtn {
  orderBy: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  handleOrderChange: (order: string) => void;
}
const DropDownbtn = ({
  orderBy,
  isOpen,
  toggleDropdown,
  handleOrderChange,
}: DropDownbtn) => {
  return (
    <div className="dd-con">
      <div className="dd-box" onClick={toggleDropdown}>
        <p>{orderBy === "recent" ? "최신순" : "좋아요순"}</p>
        <div className="d-icon">
          <img className="pc-downicon" src={downIcon} alt="PC다운아이콘" />
          <img
            className="m-downicon"
            src={Mobiledowniocn}
            alt="모바일다운아이콘"
          />
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
