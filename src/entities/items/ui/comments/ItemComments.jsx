import React, { useState } from "react";
import profile from "../../../../shared/assets/profile.svg";
import { timeDifference } from "../../../../shared/ui/utility/changeDate";

const ItemComments = ({ comments }) => {
  const [openMenuId, setOpenMenuId] = useState(null); // 개별 댓글의 메뉴 상태 관리

  // 메뉴 표시/숨김을 토글하는 함수
  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id)); // 클릭한 댓글의 id에 따라 토글
  };

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
              <div
                className="cursor-pointer relative"
                onClick={() => toggleMenu(i.id)}
              >
                ⋮
                {openMenuId === i.id && ( // 현재 클릭된 댓글의 메뉴만 열림
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                      수정하기
                    </div>
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                      삭제하기
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-x-3">
              <div>
                <img src={profile} alt="profile" />
              </div>
              <div className="flex flex-col gap-y-1">
                <div>{i.writer.nickname}</div>
                <div>{timeDifference(i.createdAt)}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <img src={noQuestions} alt="No Questions" />
        </div>
      )}
    </div>
  );
};

export default ItemComments;
