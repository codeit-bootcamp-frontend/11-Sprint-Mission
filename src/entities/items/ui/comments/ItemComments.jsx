import React from "react";
import profile from "../../../../shared/assets/profile.svg";
import { timeDifference } from "../../../../shared/ui/utility/changeDate";
const ItemComments = ({ comments }) => {
  return (
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
  );
};

export default ItemComments;
