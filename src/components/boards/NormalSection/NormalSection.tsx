"use client";

import Articles from "@/components/boards/Article";
import SearchArticles from "@/components/boards/SearchArticles/SearchArticles";
import SortToggle from "@/components/boards/SortToggle/SortToggle";
import { useArticles } from "@/hooks/useArticles";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useArticleStore } from "@/store/articleStore";
import { createSkeletonArray } from "@/utils/skeleton";
import { Article } from "@/types/article";

const devicePageSize = {
  pc: 10,
  tablet: 7,
  mobile: 5,
} as const;

const ArticleList = ({ articles }: { articles: Article[] }) =>
  articles.map((article) => (
    <Articles
      key={article.id}
      {...article}
      isLoading={false}
    />
  ));

const ArticleSkeletons = ({ count }: { count: number }) =>
  createSkeletonArray(count).map((_, index) => (
    <Articles
      key={`skeleton-${index}`}
      id={0}
      title=""
      writer={{ nickname: "" }}
      likeCount={0}
      updatedAt=""
      isLoading={true}
    />
  ));

const SearchControls = () => (
  <div className="flex items-center h-[42px] gap-[13px] mb-4 tablet:gap-[6px] tablet:mb-10 pc:gap-[16px] pc:mb-6">
    <SearchArticles />
    <SortToggle />
  </div>
);

// NormalSection
const NormalSection = () => {
  const deviceType = useDeviceType();
  const pageSize = devicePageSize[deviceType];
  const { keyword, toggleState } = useArticleStore();

  const { data, isLoading, error } = useArticles({
    orderBy: toggleState,
    pageSize,
    keyword,
  });

  if (error) {
    return <div>process of fetching articles failed</div>;
  }

  return (
    <section className="w-full">
      <h1 className="text-[20px] font-[700] mb-4 tablet:mb-12 pc:mb-6">
        게시글
      </h1>

      <SearchControls />

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <ArticleSkeletons count={pageSize} />
        ) : (
          <ArticleList articles={data?.list ?? []} />
        )}
      </div>
    </section>
  );
};

export default NormalSection;
