"use client";

import Articles from "./Article";
import { useArticles } from "@/api/apiGetArticles";
import { useDeviceType } from "@/hooks/useDeviceType";

const DEVICE_PAGE_SIZE = {
  pc: 3,
  tablet: 2,
  mobile: 1,
} as const;

const BestArticles = () => {
  const deviceType = useDeviceType();
  const { data, isLoading, error } = useArticles({
    orderBy: "like",
    pageSize: DEVICE_PAGE_SIZE[deviceType],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading articles</div>;
  }

  return (
    <div className="mb-6 pc:mb-10">
      <div
        className="text-[20px] font-[700]
        mb-4
        tablet:mb-6"
      >
        베스트 게시글
      </div>
      <div className="flex gap-0 tablet:gap-4 pc:gap-6 w-full">
        {data?.list.map((article) => (
          <Articles
            key={article.id}
            {...article}
            isBest={true}
          />
        ))}
      </div>
    </div>
  );
};

export default BestArticles;
