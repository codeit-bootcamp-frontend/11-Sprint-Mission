import { Link } from 'react-router-dom';
import { Product } from '@apptypes/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  let { id, images, name, price, favoriteCount } = product;
  const formattedPrice = price
    ? price.toLocaleString() + '원'
    : '가격 정보 없음';

  return (
    <Link className='product-link' to={`/items/${id}`}>
      <article className='product-card'>
        <img
          className='product-image'
          src={images && images[0] ? images[0] : '/images/default.png'}
          alt={name}
        />

        <div className='product-info'>
          <h2 className='product-name'>{name}</h2>
          <p className='product-price'>{formattedPrice}</p>
          <div className='product-favorite-wrapper'>
            <img src='/images/icons/ic_heart.svg' alt='하트 아이콘' />
            <p className='product-favorite'>{favoriteCount}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
