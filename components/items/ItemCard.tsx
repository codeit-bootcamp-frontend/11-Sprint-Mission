import React from 'react';
import styles from '@styles/Items.module.css';
import Heart from '@public/svgs/ic_heart.svg';
import { Product } from '@components/types/productTypes';
import Link from 'next/link';

interface ItemCardProps {
  item: Product;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <div className={styles['itemCard']}>
        <img
          src={item.images[0]}
          alt={item.name}
          className={styles['itemCardImage']}
        />
        <div className={styles['itemSummary']}>
          <div className={styles['itemName']}>{item.name}</div>
          <div className={styles['itemPrice']}>
            {item.price.toLocaleString()}원
          </div>
          <div className={styles['favoriteCount']}>
            <Heart />
            {item.favoriteCount}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
