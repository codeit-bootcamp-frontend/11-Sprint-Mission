import "./ListItem.css";
import ic_heart from "../../assets/images/ic_heart.svg";
import thumbDefault from "../../assets/images/thumbnail-placeholder.png";
import { Link } from "react-router-dom";
import { Product } from "../../types/Product";

function ListItem({
  item,
  type = null,
}: {
  item: Product;
  type?: string | null;
}) {
  const classNames = `Item ${type ? type : ""}`;

  const handleErrorLoadingImg = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    const img = event.target as HTMLImageElement;
    img.src = thumbDefault;
  };

  return (
    <Link to={`/items/${item.id}`}>
      <div className={classNames}>
        <img
          className="thumbnail"
          src={item.images[0] ?? thumbDefault}
          alt={item.name}
          onError={handleErrorLoadingImg}
        />
        <div className="Item-content">
          <h4 className="name">{item.name}</h4>
          <div className="price">{`${item.price}원`}</div>
          <div className="favorite">
            <img src={ic_heart} alt="좋아요" />
            <div>{item.favoriteCount}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListItem;
