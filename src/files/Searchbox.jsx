import searchIcon from "../images/searchIcon.png";
import "./Searchbox.css";
const Searchbox = () => {
  return (
    <div className="search-box">
      <img src={searchIcon} alt="돋보기아이콘" />
      <input type="text" placeholder="검색할 상품을 입력해주세요" />
    </div>
  );
};
export default Searchbox;
