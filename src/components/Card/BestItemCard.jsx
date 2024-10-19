import "./BestItemCard.css";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Heart from "../../assets/icons/ic_heart.svg";
import Default from "../../assets/default.svg";

function BestItemCard({ item }) {
  const { id, name, price, images, favoriteCount } = item;
  const nav = useNavigate();

  return (
    <div className="BestItemCard" onClick={() => nav(`/items/${id}`)}>
      <div className="BestItemCard__imgWrapper">
        <img
          className="BestItemCard__img"
          src={images && images.length > 0 ? images[0] : Default}
          alt="img"
        />
      </div>
      <section className="BestItemCard__textSection">
        <h4 className="BestItemCard__name">{name}</h4>
        <h4 className="BestItemCard__price">{price.toLocaleString("ko-KR")}</h4>
        <div className="BestItemCard__favor">
          <img src={Heart} alt="ic_heart" />
          <p className="BestItemCard__favorCount">{favoriteCount}</p>
        </div>
      </section>
    </div>
  );
}

export default BestItemCard;
