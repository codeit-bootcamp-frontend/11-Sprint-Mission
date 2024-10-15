import "./ProductCard.css";
import HeartIcon from "../images/ic_heart.svg";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} />
      <div className="product-text">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-price">{product.price}원</p>
        <div className="product-favorite">
          <img src={HeartIcon} alt="좋아요 아이콘" />
          <span className="favorite-count">{product.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
