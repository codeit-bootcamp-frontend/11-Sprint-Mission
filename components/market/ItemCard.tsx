import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "@/public/images/ic_heart.svg";
import { Product } from "@/types/Types";

interface ItemCardProps {
  item: Product;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link href={`/items/${item.id}`} className="itemCard">
      <Image
        src={item.images[0]}
        alt={`${item.name} 상품 썸네일`}
        className="itemCardImg"
        layout="responsive"
        width={1} // 비율 유지 (가로 1)
        height={1} // 비율 유지 (세로 1)
      />
      <div>
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <Image src={HeartIcon} alt="좋아요" width={24} height={24} />
          {/* <Image
            src="/images/ic_heart.svg"
            alt="Heart Icon"
            width={20}
            height={20}
          /> */}
          {item.favoriteCount}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
