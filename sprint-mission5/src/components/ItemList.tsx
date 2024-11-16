import { Link } from "react-router-dom";
import heartIcon from "../images/itemIcon/ic_heart.png";
import "./ItemList.css";

interface Item {
  id: number;
  name: string;
  price: number;
  images: string;
  favoriteCount: number;
}

interface ListItemProps {
  item: Item;
}

function ListItem({ item }: ListItemProps) {
  return (
    <div className="item-con">
      <Link to={`/ItemContainer/${item.id}`}>
        <div className="item-img">
          <img src={item.images} alt={item.name || "상품 이미지"} />
        </div>
        <div className="item-txt-wrap">
          <h2 className="item-name">{item.name}</h2>
          <p className="item-price">{(item.price || 0).toLocaleString()}원</p>
          <div className="item-good-box">
            <div className="heart-img">
              <img src={heartIcon} alt="좋아요 아이콘" />
            </div>
            <p>{item.favoriteCount}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListItem;
