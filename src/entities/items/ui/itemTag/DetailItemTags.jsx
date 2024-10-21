import React from "react";
import DetailItemTag from "./DetailItemTag";

const DetailItemTags = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-1">
      {" "}
      <div className="font-semibold">상품태그</div>
      <div className="flex  gap-x-1 sm:gap-x-3">
        {data.tags.map((i) => (
          <DetailItemTag i={i} />
        ))}
      </div>
    </div>
  );
};

export default DetailItemTags;
