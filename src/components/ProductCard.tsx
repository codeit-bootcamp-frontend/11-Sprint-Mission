import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import '../styles/Reset.css';
import HeartIcon from '../image/heart-icon.png';

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/items/${product.id}`);
  };

  return (
    <div className={`product-card ${className}`} onClick={handleClick}>
      <img
        src={product.images[0]}
        alt="상품 이미지"
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
      <div className="favorite-count">
        <img src={HeartIcon} alt="좋아요 아이콘" />
        <span>{product.favoriteCount}</span>
      </div>
    </div>
  );
}

export default ProductCard;
