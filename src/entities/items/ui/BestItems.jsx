import React from "react";
import { fetchItems } from "../service/fetchItems";
import BestItem from "./BestItem";
import { useQuery } from "@tanstack/react-query";
const BestItems = () => {
  const { data, isLoading, isError } = useQuery({
    //favorit으로만 정렬해서 가져옴
    queryKey: ["postsFavorit"], // 캐시 키로 사용
    queryFn: () => fetchItems(1, 10, "favorite"), // 서버에서 데이터를 가져오는 함수
  });
  if (isLoading) return <div>isLoading...</div>;
  if (isError) return <div>Error!</div>;
  return (
    <div className="w-full p-2 flex  flex-col gap-y-3  lg:w-2/3 lg:justify-center">
      <h2 className="text-base font-bold">베스트 상품</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.list.slice(0, 4).map((item) => (
          <BestItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BestItems;
