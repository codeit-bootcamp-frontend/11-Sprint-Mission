import React from "react";
import heart from "../../../shared/assets/heart.svg";
import { Link } from "react-router-dom";
const BestItem = ({ item }) => {
  console.log(item);
  return (
    <div key={item.id} className="">
      <div className="mb-1">
        <Link to={`/products/${item.id}`} className="w-full">
          <img className="w-full h-48 rounded-lg" src={item.images[0]}></img>
        </Link>
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
