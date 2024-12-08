import SearchIcon from '@public/svgs/ic_search.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/SearchBar.module.css';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = '검색할 키워드를 입력해 주세요',
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const currentKeyword = (router.query.q as string) || '';
    setKeyword(currentKeyword);
  }, [router.query.q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  return (
    <div className={styles['searchbar-container']}>
      <SearchIcon alt="검색" />
      <input
        className={styles['searchbar-input']}
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
