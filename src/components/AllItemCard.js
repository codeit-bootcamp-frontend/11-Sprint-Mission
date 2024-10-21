import favoriteIcon from "../assets/Icon.svg";
import defaultImg from "../assets/-error-outline_90275.png";
import "./AllItemCard.css";
import "./common.css";
import { Link } from "react-router-dom";

function AllItemCard({ item }) {
  const handleNoneImg = (e) => {
    e.target.src = defaultImg;
  };

  return (
    <div className="item-card">
      <Link to={`/items/${item.id}`}>
        <img
          src={item.images[0]}
          alt={item.name}
          className="all-item-card-img"
          onError={handleNoneImg}
        />
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

export default AllItemCard;
