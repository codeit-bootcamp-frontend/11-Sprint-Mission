import styled from 'styled-components';
import { formatPrice } from '../../utils/format';

import font from '../../styles/fontStyle.styled';
import { sizeStyles } from './ProdCard.styles';

import ProdDefaultImages from './ProdDefaultImages';
import Heart from '../HeartButton/HeartButton';

const ProdContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ProdImages = styled.div`
  overflow: hidden;
  ${({ $size }) => sizeStyles[$size] || ''}
`;

const PordDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  h2 {
    ${font('14m')}
  }

  p {
    ${font('16b')}
  }
`;

function ProdCard({
  size = 'md',
  src,
  title = '상품 타이틀',
  price = 0,
  count = 0,
}) {
  const formattedPrice = formatPrice(price);

  return (
    <ProdContainer>
      <ProdImages $size={size}>
        {src ? (
          <img src={src} alt={title} />
        ) : (
          <ProdDefaultImages size={size} />
        )}
      </ProdImages>
      <PordDesc>
        <h2>{title}</h2>
        <p>{formattedPrice}원</p>
        <Heart size='sm' count={count} />
      </PordDesc>
    </ProdContainer>
  );
}

export default ProdCard;
