import { useState } from 'react';
import styles from './Search.module.css';
import Image from 'next/image';
import searchIcon from '@/public/ic_search.svg';

interface SearchProps {
  onSearch: (query: string) => void;
  addClassName?: string;
}

const Search = ({ onSearch, addClassName }: SearchProps) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className={`${addClassName || ''} ${styles['search-container']}`}>
      {/* TODO search 컴포넌트 css 공통화 */}
      <div className={styles['search-icon']}>
        <Image src={searchIcon} alt="검색 아이콘" width={20} height={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles['search-input']}
        placeholder="검색할 상품을 입력해주세요"
      />
    </div>
  );
};

export default Search;
