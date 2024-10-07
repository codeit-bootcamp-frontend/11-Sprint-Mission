import React from 'react';
import '../style/Items.css';

function ItemCard({ item }) {
  return (
    <div className="itemCard">
      <img src={item.images[0]} alt={item.name} className="itemCardImage" />
      <div className="itemSummary">
        <div className="itemName">{item.name}</div>
        <div className="itemPrice">{item.price.toLocaleString()}원</div>
        <div className="favoriteCount">
          <img
            src={process.env.PUBLIC_URL + '/images/ic_heart.svg'}
            alt="하트아이콘"
          />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
