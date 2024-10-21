import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchDetailItem } from "../../entities/items/api/fetchDetailItem";

import { fetchItemComments } from "../../entities/items/api/fetchItemComments";
import { timeDifference } from "../../shared/ui/utility/changeDate";

import ItemInfo from "../../entities/items/ui/itemDetail/ItemInfo";
import Inquiry from "../../entities/items/ui/inquiry/inquiry";
import ItemComments from "../../entities/items/ui/comments/itemComments";
import BackButton from "../../features/back/BackButton";

const ItemDetail = () => {
  const { itemId } = useParams(); // URL에서 id 가져오기

  const { data, isLoading } = useQuery({
    queryKey: ["getDetailInformation", itemId],
    queryFn: () => fetchDetailItem(itemId),
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", itemId],
    queryFn: () => fetchItemComments(itemId),
  });

  if (isLoading || commentsLoading) {
    return (
      <div className="fixed top-30 left-1/2 transform -translate-x-1/2">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center flex-col mt-5 p-1 sm:p-0 ">
      <ItemInfo data={data} />
      <div className="w-full p-2  flex flex-col  gap-y-3  lg:w-2/3 ">
        <Inquiry />
        <ItemComments comments={comments} />
        <BackButton />
      </div>
    </div>
  );
};

export default ItemDetail;
