import './ProductCard.css';
import '../styles/Reset.css';
import heartIcon from '../image/heart-icon.png';

function ProductCard({ product, className }) {
  return (
    <div className={`product-card ${className}`}>
      <img
        src={product.images[0]}
        alt="상품 이미지"
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
      <div class="favorite-count">
        <img src={heartIcon} alt="좋아요 아이콘" />
        <span>{product.favoriteCount}</span>
      </div>
    </div>
  );
}

export default ProductCard;
