import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  let { id, images, name, price, favoriteCount } = product;
  price = price.toLocaleString() + '원';

  return (
    <Link className="product-link" to={`/items/${id}`}>
      <article className="product-card">
        <img className="product-image" src={images[0]} alt={name} />

        <div className="product-info">
          <h2 className="product-name">{name}</h2>
          <p className="product-price">{price}</p>
          <div className="product-favorite-wrapper">
            <img src="/images/icons/ic_heart.svg" alt="하트 아이콘" />
            <p className="product-favorite">{favoriteCount}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
