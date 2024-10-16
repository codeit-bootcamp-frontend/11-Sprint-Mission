import React from "react";

function Search({ setKeyword }) {
  const handleChange = ({ target }) => setKeyword(target.value);
  return (
    <div className="input-area">
      <img src="/images/icons/ic_search.svg" alt="검색할 상품을 입력해주세요" />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;