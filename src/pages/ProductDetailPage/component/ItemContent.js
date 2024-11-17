import React from "react";
import TagList from "./TagList";
import LikeButton from "./LikeButton";
import { ReactComponent as Kebab } from "../../../images/ic_kebab.svg";

function ItemContent({ product }) {
  return (
    // <div>
    //   <img src={product.images[0]} alt={`${product.name} 상품 대표 사진`} />

    //   <div>
    //     <button>
    //       <Kebab />
    //     </button>

    //     <div>
    //       {product.name}
    //       {product.price.toLocaleString()}원
    //     </div>

    //     <div>
    //       <p>상품 소개</p>
    //       {product.description
    //     </div>

    //     <div>
    //       <p>상품 태그</p>
    //       <TagList tags={product.tags} />
    //     </div>
    //   </div>

    //   <LikeButton
    //     productId={product.id}
    //     isFavorite={product.isFavorite}
    //     favoriteCount={product.favoriteCount}
    //   />
    // </div>
    <div className="sectionContainer">
      {/* 상품 대표 이미지 */}
      <div className="itemImage">
        <img src={product.images[0]} alt={`${product.name} 상품 대표 사진`} />
      </div>

      <div className="itemDetailContainer">
        <div className="mainDetail">
          {/* 더보기 버튼 */}
          <button className="kebabButton">
            <Kebab className="kebobIcon" />
          </button>

          <div>
            <h2 className="itemName">{product.name}</h2>
            {/* 가격 표시 */}
            <p className="itemPrice">{product.price.toLocaleString()}원</p>
          </div>

          <hr />

          <div>
            <h3 className="itemIntroduce">상품 소개</h3>
            <p className="description">{product.description}</p>
          </div>

          <div className="tagSection">
            <h3 className="tag">상품 태그</h3>
            <TagList tags={product.tags} />
          </div>
        </div>

        <LikeButton
          productId={product.id}
          isFavorite={product.isFavorite}
          favoriteCount={product.favoriteCount}
        />
      </div>

      <hr />
    </div>
  );
}

export default ItemContent;
