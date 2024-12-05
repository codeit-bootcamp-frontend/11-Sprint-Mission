"use client";

import Articles from "@/components/boards/Article";
import { useArticles } from "@/api/apiGetArticles";
import { useDeviceType } from "@/hooks/useDeviceType";
import { createSkeletonArray } from "@/utils/skeleton";
import { Article } from "@/types/article";

const devicePageSize = {
  pc: 3,
  tablet: 2,
  mobile: 1,
} as const;

const BestArticleList = ({ articles }: { articles: Article[] }) =>
  articles.map((article) => (
    <Articles
      key={article.id}
      {...article}
      isBest={true}
      isLoading={false}
    />
  ));

const BestArticleSkeletons = ({ count }: { count: number }) =>
  createSkeletonArray(count).map((_, index) => (
    <Articles
      key={`skeleton-${index}`}
      id={0}
      title=""
      writer={{ nickname: "" }}
      likeCount={0}
      updatedAt=""
      isBest={true}
      isLoading={true}
    />
  ));

// BestSection
const BestSection = () => {
  const deviceType = useDeviceType();
  const pageSize = devicePageSize[deviceType];

  const { data, isLoading, error } = useArticles({
    orderBy: "like",
    pageSize,
  });

  if (error) {
    return <div>process of fetching articles failed</div>;
  }

  return (
    <section className="mb-6 pc:mb-10 w-full">
      <h1 className="text-[20px] font-[700] mb-4 tablet:mb-6">베스트 게시글</h1>
      <div className="flex gap-0 tablet:gap-4 pc:gap-6 w-full">
        {isLoading ? (
          <BestArticleSkeletons count={pageSize} />
        ) : (
          <BestArticleList articles={data?.list ?? []} />
        )}
      </div>
    </section>
  );
};

export default BestSection;
