import iconHeart from '../assets/icon-heart.svg';
import noImage from '../assets/no-image.svg';

export default function Product({ image = noImage, name, price = 0, favoriteCount = 0 }) {
  const handleImageError = (e) => {
    e.target.src = noImage;
  };

  return (
    <div className="product">
      <figure className="wrap-img">
        <img src={image} alt={name} onError={handleImageError} />
      </figure>

      <h3 className="product-title">{name}</h3>

      <div className="font-bold">{price.toLocaleString()}원</div>

      <div className="product-favorite">
        <img src={iconHeart} alt="" />
        {favoriteCount}
      </div>
    </div>
  );
}
