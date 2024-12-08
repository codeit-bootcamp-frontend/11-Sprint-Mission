import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

import { sort } from '@/types';

interface DropDownProps {
  sort: sort;
  setSort: Dispatch<SetStateAction<sort>>;
}

export default function DropDown({ sort, setSort }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: sort) => {
    console.log(option);
    setSort(option);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <div
        className='p-3 border-2 border-gray-200 rounded-xl hover:cursor-pointer hover:bg-gray-300'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          className='sm:hidden'
          src='/images/icons/ic_sort.svg'
          alt='드롭다운 이미지'
          width={24}
          height={24}
        />
        <div className='hidden sm:flex w-24 justify-between px-2'>
          <p className='whitespace-nowrap'>
            {sort === 'recent' ? '최신순' : '좋아요순'}
          </p>
          <div>
            <Image
              className='flex-shrink-0'
              src={'/images/icons/ic_arrow_down.svg'}
              alt='아래 화살표 이미지'
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='absolute w-24 sm:w-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg text-center'>
          <div
            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => handleOptionClick('recent')}
          >
            최신순
          </div>
          <div
            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => handleOptionClick('like')}
          >
            좋아요순
          </div>
        </div>
      )}
    </div>
  );
}
