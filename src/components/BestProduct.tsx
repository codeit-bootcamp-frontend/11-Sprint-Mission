import styles from '../styles/BestProduct.module.css';
import icHeart from '../assets/ic_heart.svg';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface BestProductItem {
  id: number;
  images: any;
  name: string;
  price: number;
  favoriteCount: number;
}

interface BestProductProps {
  items: BestProductItem[];
}

function BestProduct({ items }: BestProductProps) {
  return (
    <ul className={styles.BestProductList}>
      {items.map((item) => (
        <li key={item.id}>
          <Link href={`/items/${item.id}`} passHref>
            <div className={styles.BestProductItem}>
              <img
                className={styles.BestProductItemImg}
                src={item.images}
                alt={item.name}
              />
              <div>
                <p className={styles.BestProductName}>{item.name}</p>
                <p className={styles.BestProductPrice}>
                  {item.price.toLocaleString()}원
                </p>
                <p className={styles.BestProductFavoriteCount}>
                  <img src={icHeart} alt="iconHeart" />
                  {item.favoriteCount}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default BestProduct;
