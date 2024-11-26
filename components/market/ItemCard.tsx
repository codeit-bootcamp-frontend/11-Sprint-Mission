import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "../../../public/images/ic_heart.svg";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
}

interface ItemCardProps {
  item: Product;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`} className="itemCard">
      <Image
        src={item.images[0]}
        alt={`${item.name} 상품 썸네일`}
        className="itemCardImg"
      />
      <div>
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
