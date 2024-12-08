import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

import { sort } from '@/types';

import DropDown from './DropDown';

interface SearchBarProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sort: sort;
  setSort: Dispatch<SetStateAction<sort>>;
}

export default function SearchBar({
  setSearchQuery,
  sort,
  setSort,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (inputValue === '') {
      setSearchQuery('');
    } else {
      setSearchQuery(inputValue);
    }
  };

  return (
    <div className='relative flex items-center space-x-2'>
      <Image
        className='absolute top-2.5 sm:top-3.5 left-4'
        src={'/images/icons/ic_search.svg'}
        alt='검색 이미지'
        width={24}
        height={24}
      />
      <input
        className='w-full py-2 pl-9 pr-5 bg-gray-100 rounded-xl'
        type='text'
        placeholder='검색할 상품을 입력해주세요'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleSearch}
      />

      <DropDown sort={sort} setSort={setSort} />
    </div>
  );
}
