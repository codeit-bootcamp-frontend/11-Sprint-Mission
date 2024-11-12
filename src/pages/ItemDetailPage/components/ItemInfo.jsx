import React from "react";
import "./ItemInfo.css";
import { ReactComponent as HeartIcon } from "../../../images/icons/heart.svg";

function ItemInfo({ product }) {
  return (
    <div className="itemInfo">
      <img className="itemImage" src={product.images[0]} alt={product.name} />
      <div className="itemDetailContainer">
        <div className="itemDetailContentContainer">
          <div className="itemTitle">
            <h1 className="itemName">{product.name}</h1>
            <h1 className="itemPrice">{product.price.toLocaleString()}원</h1>
          </div>
          <div className="descriptionContainer">
            <h3>상품 소개</h3>
            <p className="itemDescription">{product.description}</p>
          </div>
          <div className="itemTags">
            <h3 className="tagTitle">상품 태그</h3>
            {product.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="heartButtonContainer">
          <button className="heartButton">
            <HeartIcon className="heartIcon" />
            {product.favoriteCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemInfo;
