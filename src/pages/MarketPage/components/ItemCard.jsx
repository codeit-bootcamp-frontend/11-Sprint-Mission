import React from "react";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";

function ItemCard({ item }) {
  return (
    <div className="itemCard">
      <img className="itemCardImg" src={item.images[0]} alt="이미지 미리보기" />
      <div className="itemInfo">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="itemFavoritCnt">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
