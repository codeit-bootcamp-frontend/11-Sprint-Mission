import React from "react";
import "./item.css";

const Item = ({ price, name, images, favoriteCount }) => {
  return (
    <div className="item">
      <img className="itemImage" src={images} alt="product image" />
      <div className="itemInfo">
        <span>{name}</span>
        <span>{price}</span>
        <span className="favoriteCount">
          <img className="heartIcon" src="/Icon/heart.svg" alt="heart icon" />
          {favoriteCount}
        </span>
      </div>
    </div>
  );
};

export default Item;
