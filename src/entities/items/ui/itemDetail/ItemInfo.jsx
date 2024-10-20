import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDetailItem } from "../../api/fetchDetailItem";

import Sellor from "../sellor/sellor";
import { formatDate } from "../../../../shared/ui/utility/changeDate";
import DetailItemTags from "../itemTag/DetailItemTags";

const ItemInfo = ({ data }) => {
  const formattedDate = formatDate(data.updatedAt);

  return (
    <div className="w-full p-1  border-b flex  gap-y-3  lg:w-2/3 lg:justify-center sm:p-5">
      <div className="w-full flex gap-x-3">
        <div className="flex-[4]">
          <img className="w-full h-full" src={data.images[0]}></img>
        </div>
        <div className="flex-[6]  flex-col flex gap-y-3 relative ">
          <div className="border-b pb-3">
            <div className="mb-3 text-lg">{data.name}</div>
            <div className="text-xl font-bold">{data.price}원</div>
          </div>
          <div className="flex flex-col text-xs gap-y-3 sm:text-sm ">
            <div className="flex flex-col gap-y-1 ">
              <div className="font-semibold">상품 소개</div>
              <div>{data.description}</div>
            </div>
            <DetailItemTags data={data} />
          </div>
          <Sellor data={data} formattedDate={formattedDate} />
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
