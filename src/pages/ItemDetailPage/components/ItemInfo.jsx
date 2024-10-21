import React from "react";
import "./ItemInfo.css";

const ItemInfo = ({ product }) => {
  return (
    <div className="itemInfo">
      <img className="itemImage" src={product.images[0]} alt={product.name} />
      <div className="itemDetailContainer">
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
          {/* 반응형 디자인 조금 더 고려해야함 아직 미완성 
          그리고 하트버튼과 사용자 정보?는 컴포넌트로 추가할 예정
          */}
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
