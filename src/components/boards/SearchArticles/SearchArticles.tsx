"use client";

import { useState, useEffect } from "react";
import { useArticleStore, ArticleStore } from "@/store/articleStore";
import { useDebounce } from "@/hooks/useDebounce";

const SearchArticles = () => {
  const setKeyword = useArticleStore((state: ArticleStore) => state.setKeyword);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce(searchInput, 500);

  useEffect(() => {
    setKeyword(debouncedValue);
  }, [debouncedValue, setKeyword]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchInput(value);
  };

  return (
    <div
      className="mt-10 mb-10 h-[42px]
      w-[288px]
      tablet:w-[560px]
      pc:w-[1054px]"
    >
      <input
        type="text"
        onChange={handleSearch}
        value={searchInput}
        placeholder="검색할 상품을 입력해주세요"
        className="w-full h-full rounded-[12px] bg-gray100 p-4"
      />
    </div>
  );
};

export default SearchArticles;
