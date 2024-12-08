import React from "react";
import TagList from "./TagList";
import LikeButton from "./LikeButton";
import Kebab from "@/public/images/ic_kebab.svg";
import { Product } from "@/types/Types";
import Image from "next/image";

interface ItemContentProps {
  product: Product;
}

function ItemContent({ product }: ItemContentProps) {
  return (
    <div className="sectionContainer">
      {/* 상품 대표 이미지 */}
      <div className="itemImage">
        <img src={product.images[0]} alt={`${product.name} 상품 대표 사진`} />
      </div>

      <div className="itemDetailContainer">
        <div className="mainDetail">
          {/* 더보기 버튼 */}
          <button className="kebabButton">
            <Image
              src={Kebab}
              alt="kebab"
              width={24}
              height={24}
              className="kebobIcon"
            />
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
