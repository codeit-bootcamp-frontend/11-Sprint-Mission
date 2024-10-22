import { Link } from "react-router-dom";
import heartIcon from "../images/itemIcon/ic_heart.png";
import "./ItemList.css";
function ListItem({ item }) {
  return (
    <div className="item-con">
      <Link to={`/ItemContainer/${item.id}`}>
        <div className="item-img">
          <img src={item.images} alt={item.name} />
        </div>
        <div className="item-txt-wrap">
          <h2 className="item-name">{item.name}</h2>
          <p className="item-price">{item.price.toLocaleString()}원</p>
          <div className="item-good-box">
            <div className="heart-img">
              <img src={heartIcon} alt="좋아요아이콘" />
            </div>
            <p>{item.favoriteCount}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListItem;
