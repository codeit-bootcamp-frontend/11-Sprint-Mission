import '../styles/BestProduct.css';
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
    <ul className="BestProductList">
      {items.map((item) => (
        <li key={item.id}>
          <NavLink to={`/items/${item.id}`}>
            <div className="BestProductItem">
              <img
                className="BestProductItem-img"
                src={item.images}
                alt={item.name}
              />
              <div>
                <p className="BestProductName">{item.name}</p>
                <p className="BestProductPrice">{item.price}원</p>
                <p className="BestProductFavoriteCount">
                  <img src={icHeart} alt="iconHert" />
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
