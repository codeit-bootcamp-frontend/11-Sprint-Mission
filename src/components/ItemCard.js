import React from 'react';
import '../style/Items.css';
import { ReactComponent as Heart } from '../images/ic_heart.svg';
import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.id}`} state={{ item: item }}>
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
