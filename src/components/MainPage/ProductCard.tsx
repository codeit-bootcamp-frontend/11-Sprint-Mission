import React from "react";
import { Link } from "react-router-dom";
import heart from "../../assets/image/Icon.png";
import noPic from "../../assets/image/noPic.png";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    favoriteCount: number;
    images: string[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/items/${product.id}`} className="detail-link">
      <li className="all-product-list">
        <div className="all-product-image-box">
          <img
            className="all-product-image"
            src={product.images[0] || noPic}
            alt={product.images[0] ? product.name : "기본이미지"}
            onError={(e) => (e.currentTarget.src = noPic)}
          />
        </div>

        <h3 className="all-product-name">{product.name}</h3>
        <p className="all-product-price">{product.price}원</p>
        <div className="all-product-count-box">
          <img
            className="all-product-count-image"
            src={heart}
            alt="좋아요 하트 기호"
          />
          <p className="all-product-count">{product.favoriteCount}</p>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
