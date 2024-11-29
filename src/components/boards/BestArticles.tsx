"use client";

import Articles from "./Articles";
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
    <div className="flex gap-0 tablet:gap-4 pc:gap-6 w-full">
      {data?.list.map((article) => (
        <Articles
          key={article.id}
          {...article}
          isBest={true}
        />
      ))}
    </div>
  );
};

export default BestArticles;
