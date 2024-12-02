"use client";

import { useState } from "react";
import debounce from "lodash/debounce";
import { useArticleStore, ArticleStore } from "@/store/articleStore";

const SearchArticles = () => {
  const setKeyword = useArticleStore((state: ArticleStore) => state.setKeyword);
  const [searchInput, setSearchInput] = useState("");

  const debounceDelay = 500;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchInput(value);
    debounce(() => setKeyword(value), debounceDelay)();
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
