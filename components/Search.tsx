import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from '@/public/images/icons/ic_search.svg'

interface SearchProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder = "검색할 키워드를 입력해 주세요" }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const currentKeyword = (router.query.q as string) || "";
    setKeyword(currentKeyword);
  }, [router.query.q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(keyword);
  };

  return (
    <SearchSection>
      <SearchIcon alt="검색" />
      <SearchInput
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </SearchSection>
  );
};

export default Search;

const SearchSection = styled.div`
	display: flex;
  align-items: center;
  background-color: var(--gray-100);
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  background-color: inherit;
  margin-left: 4px;
	min-width: 282px;

  @media (min-width: 768px) {
    max-width: 560px;
  }

	@media (min-width: 1200px) {
		max-width: 1200px;
	}
`;
