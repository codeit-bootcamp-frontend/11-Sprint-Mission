import React, { useState } from "react";

function Search({ setProducts, perPage }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = ({ target }) => {
    const search = target.value;
    setKeyword(search);
  };
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
