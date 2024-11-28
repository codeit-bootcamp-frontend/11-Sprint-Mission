import { useState } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  return (
    <div className='search-container'>
      <img
        className='search-icon'
        src='images/icons/ic_search.svg'
        alt='검색 아이콘'
      />
      <input
        className='search-input'
        type='text'
        value={keyword}
        placeholder='검색할 상품을 입력해주세요'
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
