import React from "react";
import { ReactComponent as HeartIcon } from "../../../images/icons/heart.svg";
import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <Link to={`/items/${item.id}`} className="productCard">
      <img src={item.images[0]} alt={item.name} className="productCardImg" />
      <div className="productContents">
        <h2 className="productName">{item.name}</h2>
        <p className="productPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
