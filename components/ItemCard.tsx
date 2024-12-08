import React from 'react';
import '../style/Items.css';
import Heart from '@pubilc/svgs/ic_heart.svg';
import { Product } from '@components/types/productTypes';
import Link from 'next/link';

interface ItemCardProps {
  item: Product;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <div className="itemCard">
        <img src={item.images[0]} alt={item.name} className="itemCardImage" />
        <div className="itemSummary">
          <div className="itemName">{item.name}</div>
          <div className="itemPrice">{item.price.toLocaleString()}원</div>
          <div className="favoriteCount">
            <Heart />
            {item.favoriteCount}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
