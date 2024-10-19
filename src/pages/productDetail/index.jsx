import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchDetailItem } from "../../entities/items/fetchDetailItem";
import profile from "../../shared/assets/profile.svg";
import heart from "../../shared/assets/heart.svg";
import { fetchItemComments } from "../../entities/items/fetchItemComments";
import { formatDate, timeDifference } from "../../shared/ui/utility/changeDate";
import backButton from "../../shared/assets/back.svg";
import noQuestions from "../../shared/assets/noQuestions.svg";

const ProductDetail = () => {
  const { productId } = useParams(); // URL에서 id 가져오기
  console.log(productId);
  const { data, isLoading } = useQuery({
    queryKey: ["getDetailInformation", productId],
    queryFn: () => fetchDetailItem(productId),
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => fetchItemComments(productId),
  });

  if (isLoading || commentsLoading) {
    return (
      <div className="fixed top-30 left-1/2 transform -translate-x-1/2">
        <div>Loading...</div>
      </div>
    );
  }
  const formattedDate = formatDate(data.updatedAt);

  return (
    <div className="w-full flex justify-center items-center flex-col mt-5 p-1 sm:p-0 ">
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
              <div className="flex flex-col gap-y-1">
                {" "}
                <div className="font-semibold">상품태그</div>
                <div className="flex  gap-x-1 sm:gap-x-3">
                  {data.tags.map((i) => (
                    <div className="bg-slate-200  text-xs h-5 border rounded-xl flex p-4 items-center relative">
                      # {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full h-20">
              <div className="flex gap-x-1 w-full absolute bottom-0 sm:gap-x-3">
                <div className="">
                  <img className="h-full" src={profile}></img>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-xs">
                    <div>{data.ownerNickname}</div>
                    <div className="text-[8px]">{formattedDate}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex  items-center justify-center border rounded-xl p-1 sm:w-16">
                      <div className="h-full ">
                        <img className="h-3 w-5" src={heart}></img>
                      </div>
                      <div className="text-[8px]">{data.favoriteCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-2  flex flex-col  gap-y-3  lg:w-2/3 ">
        <div className="w-full">문의하기</div>
        <textarea
          className="w-full h-32 p-2 border bg-slate-200 text-sm"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        ></textarea>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className={"w-14 h-10 border rounded-lg bg-slate-400 text-white "}
          >
            등록
          </button>
        </div>
        <div className="flex flex-col gap-y-10">
          {comments && comments.list.length > 0 ? (
            comments.list.map((i) => (
              <div
                key={i.id}
                className="flex gap-y-4 flex-col border-b p-3 text-xs"
              >
                <div className="flex justify-between">
                  <div>{i.content}</div>
                  <div className="cursor-pointer">⋮</div>
                </div>
                <div className="flex gap-x-3">
                  <div>
                    <img src={profile}></img>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div>{i.writer.nickname}</div>
                    <div>{timeDifference(i.createdAt)}</div>
                  </div>
                </div>
              </div> // key로 고유한 ID 사용
            ))
          ) : (
            <div className="flex justify-center">
              <img src={noQuestions}></img>
            </div> // 댓글이 없을 때 표시
          )}
        </div>
        <div className="mt-10 flex justify-center mb-24 ">
          <Link to="/items">
            <div className="bg-[#3692FF]  text-sm text-white p-3 flex items-center gap-x-2 rounded-2xl">
              <div>목록으로 돌아가기</div>{" "}
              <div>
                {" "}
                <img src={backButton}></img>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
