import { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  }

  return (
    <div className="search-container">
      <img
        className="search-icon"
        src="images/icons/ic_search.svg"
        alt="검색 아이콘"
      />
      <input
        className="search-input"
        type="text"
        value={keyword}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
