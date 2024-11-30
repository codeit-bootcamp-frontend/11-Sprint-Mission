"use client";

import Articles from "./Article";
import SearchArticles from "@/components/boards/SearchArticles/SearchArticles";
import SortToggle from "@/components/boards/SortToggle/SortToggle";
import { useArticles } from "@/api/apiGetArticles";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useArticleStore } from "@/store/articleStore";

const DEVICE_PAGE_SIZE = {
  pc: 10,
  tablet: 7,
  mobile: 5,
} as const;

const SortedArticles = () => {
  const DEVICE_TYPE = useDeviceType();
  const { keyword, toggleState } = useArticleStore();

  const { data, isLoading, error } = useArticles({
    orderBy: toggleState,
    pageSize: DEVICE_PAGE_SIZE[DEVICE_TYPE],
    keyword: keyword,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading articles</div>;
  }

  return (
    <>
      <div
        className="text-[20px] font-[700]
        mb-4
        tablet:mb-12
        pc:mb-6"
      >
        게시글
      </div>

      <div
        className="flex items-center h-[42px]
        gap-[13px] mb-4
        tablet:gap-[6px] tablet:mb-10
        pc:gap-[16px] pc:mb-6"
      >
        <SearchArticles />
        <SortToggle />
      </div>

      <div className="flex flex-col gap-4">
        {data?.list.map((article) => (
          <Articles
            key={article.id}
            {...article}
          />
        ))}
      </div>
    </>
  );
};

export default SortedArticles;
