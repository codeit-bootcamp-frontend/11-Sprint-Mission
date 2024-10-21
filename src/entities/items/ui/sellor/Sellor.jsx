import React from "react";
import profile from "../../../../shared/assets/profile.svg";
import heart from "../../../../shared/assets/heart.svg";

const Sellor = ({ data, formattedDate }) => {
  return (
    <div className="flex w-full h-20">
      <div className="flex gap-x-1 w-full absolute bottom-0 sm:gap-x-3">
        <div className="">
          <img className="h-full" src={profile}></img>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-xs">
            <div>{data.ownerNickname}</div>
            <div className="text-[8px] sm:text-xs">{formattedDate}</div>
          </div>
          <div className="flex items-center">
            <div className="flex  items-center justify-center border rounded-xl p-1 sm:w-16 cursor-pointer">
              <div className="h-full ">
                <img className="h-3 w-5  sm:h-5 sm:w-7" src={heart}></img>
              </div>
              <div className="text-[8px] sm:text-xs">{data.favoriteCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellor;
