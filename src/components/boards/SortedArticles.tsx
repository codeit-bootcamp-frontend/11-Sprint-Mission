"use client";

import Articles from "./Articles";
import { useArticles } from "@/api/apiGetArticles";
import { useDeviceType } from "@/hooks/useDeviceType";

const DEVICE_PAGE_SIZE = {
  pc: 10,
  tablet: 7,
  mobile: 5,
} as const;

const SortedArticles = () => {
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
    <div className="flex flex-col gap-4">
      {data?.list.map((article) => (
        <Articles
          key={article.id}
          {...article}
        />
      ))}
    </div>
  );
};

export default SortedArticles;
