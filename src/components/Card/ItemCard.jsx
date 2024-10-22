import "./ItemCard.css";
import { useNavigate } from "react-router-dom";
import Heart from "../../assets/icons/ic_heart.svg";
import Default from "../../assets/default.svg";

function ItemCard({ item }) {
  const { id, name, price, images, favoriteCount } = item;
  const nav = useNavigate();

  return (
    <div className="ItemCard" onClick={() => nav(`/items/${id}`)}>
      <div className="ItemCard__imgWrapper">
        <img
          className="ItemCard__img"
          src={images && images.length > 0 ? images[0] : Default}
          alt="img"
          onError={(e) => {
            e.target.src = Default; // 이미지 로드 실패 시 Default 이미지로 변경
          }}
        />
      </div>
      <section className="ItemCard__textSection">
        <h4 className="ItemCard__name">{name}</h4>
        <h4 className="ItemCard__price">{price.toLocaleString("ko-KR")}</h4>
        <div className="ItemCard__favor">
          <img src={Heart} alt="ic_heart" />
          <p className="ItemCard__favorCount">{favoriteCount}</p>
        </div>
      </section>
    </div>
  );
}

export default ItemCard;
