import React from "react";
import { Link } from "react-router-dom";
import formatPriceToKRW from "utils/formatPrice";

function Product({ product }) {
  const { id, name, price, favoriteCount, images, description } = product;
  const formattedPrice = formatPriceToKRW(price);
  const image = images?.[0] || "/images/icons/ic_no_image.svg"; // 등록된 이미지가 없는 경우 대체 이미지(ic_no_image) 노출

  /**
   * // 이미지 로드에 에러 발생하는 경우 대체 이미지(ic_no_image) 노출
   * @param {*} target img 태그
   */
  const handleImageError = (target) => {
    target.src = "/images/icons/ic_no_image.svg";
  };
  return (
    <Link to={`/items/${id}`} title={`${name} 상세보기`}>
      <div className="product">
        <div className="img-wrap">
          <img
            src={image}
            alt={description || name}
            onError={({ target }) => handleImageError(target)}
          />
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
    </Link>
  );
}

export default Product;
