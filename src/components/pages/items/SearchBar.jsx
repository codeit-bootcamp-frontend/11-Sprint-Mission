function SearchBar({ onSearch }) {
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    onSearch(newQuery); // 실시간으로 검색어 전달
  };

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
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
