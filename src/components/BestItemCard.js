import { Link } from "react-router-dom";

import favoriteIcon from "../assets/Icon.svg";
import "./BestItemCard.css";
import "./common.css";

function BestItemCard({ item }) {
  return (
    <div className="item-card">
      <Link to={`/items/${item.id}`}>
        <img src={item.images[0]} alt={item.name} className="item-card-img" />
      </Link>
      <div className="item-description">
        <div className="item-name">{item.name}</div>
        <div className="item-price">{item.price.toLocaleString()}원</div>
        <div className="item-favorite-count">
          <img src={favoriteIcon} alt="좋아요 아이콘" />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default BestItemCard;
