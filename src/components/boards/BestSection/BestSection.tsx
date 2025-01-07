"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Articles from "@/components/boards/Article";
import { useArticles } from "@/hooks/useArticles";
import { useDeviceType } from "@/hooks/useDeviceType";
import { createSkeletonArray } from "@/utils/skeleton";
import { Article } from "@/types/article";

const devicePageSize = {
  pc: 3,
  tablet: 2,
  mobile: 1,
} as const;

const BestArticleList = ({ articles }: { articles: Article[] }) => (
  <div className="flex gap-0 tablet:gap-4 pc:gap-6 w-full">
    {articles.map((article) => (
      <Articles key={article.id} {...article} isBest={true} isLoading={false} />
    ))}
  </div>
);

const BestArticleSkeleton = () => {
  const deviceType = useDeviceType();
  const count = devicePageSize[deviceType];

  return (
    <div className="flex gap-0 tablet:gap-4 pc:gap-6 w-full">
      {createSkeletonArray(count).map((_, index) => (
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
      ))}
    </div>
  );
};

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-destructive">
    Error: {error.message || "Load is faileds"}
  </div>
);

const BestArticleContent = () => {
  const deviceType = useDeviceType();
  const { data } = useArticles({
    orderBy: "like",
    pageSize: devicePageSize[deviceType],
  });

  return <BestArticleList articles={data?.list ?? []} />;
};

const BestSection = () => {
  return (
    <section className="mb-6 pc:mb-10 w-full">
      <h1 className="text-[20px] font-[700] mb-4 tablet:mb-6">베스트 게시글</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<BestArticleSkeleton />}>
          <BestArticleContent />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default BestSection;
