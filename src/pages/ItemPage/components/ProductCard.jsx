import React from "react";
import { ReactComponent as HeartIcon } from "../../../images/icons/heart.svg";

function ProductCard({ product }) {
  return (
    <div className="productCard">
      <img
        src={product.images[0]}
        alt={product.name}
        className="productCardImg"
      />
      <div className="productContents">
        <h2 className="productName">{product.name}</h2>
        <p className="productPrice">{product.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {product.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
