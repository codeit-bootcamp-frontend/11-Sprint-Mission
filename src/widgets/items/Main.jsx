import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../features/post/model/fetchPost";
import { useState } from "react";
import BestItems from "./BestItems";
import useResponsiveDisplayCount from "../../features/items/hooks/useResponsiveDisplayCount";
import AllItems from "./AllItems";

const Main = () => {
  const { bestDisplayCount, allDisplayCount } = useResponsiveDisplayCount(); // 훅 사용
  const [sortBy, setSortBy] = useState("recent");

  const { data, isLoading: isBestItemsLoading } = useQuery({
    //favorit으로만 정렬해서 가져옴
    queryKey: ["postsFavorit"], // 캐시 키로 사용
    queryFn: () => fetchPosts(1, 10, "favorite"), // 서버에서 데이터를 가져오는 함수
  });

  const {
    // sortBy에 의해 정렬해서 가져옴
    data: allItemsData,
    isLoading: isAllItemsLoading,
    error: allItemsError,
  } = useQuery({
    queryKey: ["posts", sortBy], // 정렬 기준에 따라 캐시 키 변경
    queryFn: () => fetchPosts(1, 10, sortBy), // 선택된 정렬 기준에 따라 fetchPosts 호출
  });
  const handleSortChange = (e) => {
    setSortBy(e.target.value); // 선택된 옵션에 따라 sortBy 값을 업데이트
  };
  if (isBestItemsLoading || isAllItemsLoading) return <div>Loading...</div>;
  console.log(allItemsData);
  return (
    <main className="w-full flex justify-center items-center flex-col mt-5 ">
      <BestItems data={data} bestDisplayCount={bestDisplayCount} />
      <AllItems
        handleSortChange={handleSortChange}
        data={allItemsData}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </main>
  );
};

export default Main;
