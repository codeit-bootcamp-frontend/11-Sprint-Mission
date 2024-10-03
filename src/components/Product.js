import React from "react";
import formatPriceToKRW from "utils/formatPrice";

function Product({ product }) {
  const { name, price, favoriteCount, images, description } = product;
  const formattedPrice = formatPriceToKRW(price);
  return (
    <div className="product">
      <div className="img-wrap">
        <img src={images[0]} alt={description} />
      </div>
      <div className="desc-wrap">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">{formattedPrice}</div>
        <div className="product-favorite">
          <img src="/images/icons/ic_heart.svg" alt="하트" />
          <span>{favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
