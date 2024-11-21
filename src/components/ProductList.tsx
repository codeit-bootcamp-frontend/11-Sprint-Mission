import styles from '../styles/ProductList.module.css';
import icHeart from '../assets/ic_heart.svg';
import { NavLink } from 'react-router-dom';
import React from 'react';

interface ProductListProps {
  items: ProductListItem[];
}

interface ProductListItem {
  id: number;
  images: any;
  name: string;
  price: number;
  favoriteCount: number;
}

function ProductList({ items }: ProductListProps) {
  if (!items || !Array.isArray(items)) {
    return <div>상품 목록이 없습니다.</div>;
  }

  return (
    <ul className={styles.ProductList}>
      {items.map((item) => (
        <li key={item.id}>
          <NavLink to={`/items/${item.id}`}>
            <div className={styles.ProductListItem}>
              <img
                className={styles.ProductListItemImg}
                src={item.images}
                alt={item.name}
              />
              <div>
                <p className={styles.productName}>{item.name}</p>
                <p className={styles.productPrice}>{item.price}원</p>
                <p className={styles.productFavoriteCount}>
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

export default ProductList;
