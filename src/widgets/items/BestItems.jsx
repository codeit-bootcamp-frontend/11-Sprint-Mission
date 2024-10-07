import React from "react";

import BestItem from "./BestItem";
const BestItems = ({ data, bestDisplayCount }) => {
  return (
    <div className="w-full p-2 flex  flex-col gap-y-3  lg:w-2/3 lg:justify-center">
      <h2 className="text-base font-bold">베스트 상품</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.list.slice(0, bestDisplayCount).map((item) => (
          <BestItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BestItems;
