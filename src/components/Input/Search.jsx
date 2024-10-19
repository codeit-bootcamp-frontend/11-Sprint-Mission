import "./Search.css";

import icSearch from "../../assets/icons/ic_search.svg";

function Search({ onChange, onSubmit, value }) {
  return (
    <div className="Search">
      <form onSubmit={onSubmit} className="Search__form">
        <img src={icSearch} alt="search" />
        <input
          className="Search__input"
          name="keyword"
          value={value}
          onChange={onChange}
          placeholder="검색할 상품을 입력해주세요"
        />
      </form>
    </div>
  );
}

export default Search;
