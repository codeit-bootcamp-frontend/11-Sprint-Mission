import React from "react";
import heart from "../../shared/assets/heart.svg";
const BestItem = ({ item }) => {
  return (
    <div key={item.id} className="">
      <div className="mb-1">
        <img className="w-full h-48 rounded-lg" src={item.images[0]}></img>
      </div>
      <div className="text-sm truncate">{item.name} 팝니다.</div>
      <div className="text-lg font-bold">{item.price.toLocaleString()}원</div>
      <div className="flex">
        <img src={heart}></img>
        {item.favoriteCount}
      </div>
    </div>
  );
};

export default BestItem;
