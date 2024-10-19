import React from "react";
import { Link } from "react-router-dom";

const SearchBox = ({ onChangeSort }) => {
  return (
    <div>
      <div className="search-area">
        <div className="search-box">
          <Link to="" className="searchGlass"></Link>
          <input
            className="search-input"
            placeholder="검색할 상품을 입력해주세요"
          ></input>
        </div>
        <Link to="/additem" className="btn btn-primary">
          상품 등록하기
        </Link>
        <select name="최신순" onChange={onChangeSort}>
          최신순
          <option value="recent">최신순</option>
          <option value="favorite">좋아요순</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBox;
