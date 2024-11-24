import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Dropdown({
  orderBy,
  setOrderBy,
}: {
  orderBy: string;
  setOrderBy: (order: string) => void;
}) {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [dropDownView, setDropDownView] = useState<boolean>(false);

  // 드롭다운 메뉴 토글
  const handleDropdownView = () => {
    setDropDownView((prevState) => !prevState);
  };

  // 드롭다운 메뉴에서 선택한 값에 따라 정렬 조건 변경
  const handleClickLabel = (order: string) => {
    setOrderBy(order);
    setDropDownView(false);
  };

  // 바깥 클릭 시 드롭다운 메뉴 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as HTMLElement)
      ) {
        setDropDownView(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropDownRef}>
      <button
        onClick={handleDropdownView}
        className="text-gray-900 w-[130px] h-[42px] border pt-3 pb-3 pl-5 pr-5 rounded-xl flex justify-between items-center"
      >
        {orderBy === 'recent' ? '최신순' : '좋아요순'}
        <div className="w-4 h-2 relative">
          {!dropDownView ? (
            <Image
              fill
              src="/images/dropdown.png"
              alt="메뉴 다운"
              sizes="(max-width: 640px) 1rem 0.5rem"
            />
          ) : (
            <Image
              fill
              src="/images/dropup.png"
              alt="메뉴 업"
              sizes="(max-width: 640px) 1rem 0.5rem"
            />
          )}
        </div>
      </button>
      {dropDownView && (
        <div className="absolute flex flex-col justify-center items-center z-10 bg-white mt-3">
          <label
            className="flex justify-center items-center h-11 w-[130px] border rounded-t-xl"
            onClick={() => handleClickLabel('recent')}
          >
            최신순
          </label>
          <label
            className="flex justify-center items-center h-11 w-[130px] border rounded-b-xl"
            onClick={() => handleClickLabel('like')}
          >
            좋아요순
          </label>
        </div>
      )}
    </div>
  );
}
