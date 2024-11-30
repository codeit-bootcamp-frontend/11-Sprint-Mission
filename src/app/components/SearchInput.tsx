import Image from 'next/image';

export default function SearchInput({
  getSearchResult,
}: {
  getSearchResult: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <div className="flex items-center gap-1 w-full">
        <Image
          className="absolute ml-5"
          width={14}
          height={14}
          src="/images/search.png"
          alt="검색"
          sizes="(max-width: 640px) 14px 14px"
        />
        <form onSubmit={getSearchResult} className="w-full">
          <input
            className="input h-[42px] pt-2 pb-2 pl-11 pr-5 w-full focus:outline-none"
            placeholder="검색할 상품을 입력해주세요."
          />
        </form>
      </div>
    </>
  );
}
