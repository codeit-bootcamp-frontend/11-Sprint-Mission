import { formatPrice } from '../../utils/format';

import { ProdContainer, ProdImages, PordDesc } from './ProdCard.styles';

import ProdDefaultImages from './ProdDefaultImages';
import Heart from '../HeartButton/HeartButton';
import { Link } from 'react-router-dom';

function ProdCard({
  size = 'md',
  src = [],
  title = '상품 타이틀',
  price = 0,
  count = 0,
  id = null,
  ...rest
}) {
  const formattedPrice = formatPrice(price);
  const hasImage = src && src.length > 0;

  return (
    <ProdContainer>
      <Link to={`/items/${id}`}>
        <ProdImages $size={size}>
          {hasImage ? (
            <img src={src} alt={title} />
          ) : (
            <ProdDefaultImages size={size} />
          )}
        </ProdImages>
      </Link>
      <PordDesc>
        <h3>{title}</h3>
        <p>{formattedPrice}원</p>
        <Heart size='sm' count={count} {...rest} />
      </PordDesc>
    </ProdContainer>
  );
}

export default ProdCard;
