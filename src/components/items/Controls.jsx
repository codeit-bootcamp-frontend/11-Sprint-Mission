import { Link } from "react-router-dom";

const Controls = ({
  order,
  isActive,
  toggleOptionList,
  recentClick,
  favoriteClick,
}) => {
  return (
    <div className="allProduct__controls">
      <input
        className="allProduct__searchInput"
        type="text"
        placeholder="검색할 상품을 입력해주세요"
      />

      <Link to="/addItem" className="allProduct__linkButton">
        상품 등록하기
      </Link>

      <div className="allProduct__select">
        <button className="allProduct__button" onClick={toggleOptionList}>
          {order === "recent" ? "최신순" : "좋아요순"}
        </button>

        <ul className={`allProduct__optionList ${isActive ? "active" : ""}`}>
          <li>
            <button onClick={recentClick}>최신순</button>
          </li>

          <li>
            <button onClick={favoriteClick}>좋아요순</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Controls;
