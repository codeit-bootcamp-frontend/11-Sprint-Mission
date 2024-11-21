import styles from '../styles/BestProduct.module.css';
import icHeart from '../assets/ic_heart.svg';
import { NavLink } from 'react-router-dom';
import React from 'react';

interface BestProdectItem {
  id: number;
  images: any;
  name: string;
  price: number;
  favoriteCount: number;
}

interface BestProductProps {
  items: BestProdectItem[];
}

function BestProduct({ items }: BestProductProps) {
  return (
    <ul className={styles.BestProductList}>
      {items.map((item) => (
        <li key={item.id}>
          <NavLink to={`/items/${item.id}`}>
            <div className={styles.BestProductItem}>
              <img
                className={styles.BestProductItemImg}
                src={item.images}
                alt={item.name}
              />
              <div>
                <p className={styles.BestProductName}>{item.name}</p>
                <p className={styles.BestProductPrice}>{item.price}원</p>
                <p className={styles.BestProductFavoriteCount}>
                  <img src={icHeart} alt="iconHeart" />
                  {item.favoriteCount}
                </p>
              </div>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default BestProduct;
