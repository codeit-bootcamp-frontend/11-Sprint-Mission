import { formatPrice } from '../../utils/format';

import { ProdContainer, ProdImages, ProdDesc } from './ProdCard.styles';

import ProdDefaultImages from './ProdDefaultImages';
import Heart from '../HeartButton/Heart';
import { Link } from 'react-router-dom';

interface ProdCardProps {
  size?: 'md' | 'sm';
  src?: string;
  title: string;
  price?: number;
  count: number;
  id?: number | null;
}

function ProdCard({
  size = 'md',
  src = '',
  title = '상품 타이틀',
  price = 0,
  count = 0,
  id = null,
  ...rest
}: ProdCardProps) {
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
      <ProdDesc>
        <h3>{title}</h3>
        <p>{formattedPrice}원</p>
        <Heart size='sm' count={count} {...rest} />
      </ProdDesc>
    </ProdContainer>
  );
}

export default ProdCard;
