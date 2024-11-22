import Link from 'next/link';
import styled, { css } from 'styled-components';
import { formatPrice } from '@/utils/format';

import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';
import { flexColumn } from '@/styles/layout.styles';

import Heart from '@/components/shared/HeartButton/Heart';
import ProdDefaultImages from './ProdDefaultImages';

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
      <Link href={id ? `/items/${id}` : '#'}>
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

// 사이즈 스타일 정의
const sizeStyles = {
  md: css`
    width: 28.2rem;
    height: 28.2rem;
    border-radius: 1.6rem;

    ${media.tamo`
      width: 34.3rem;
      height: 34.3rem;
      border-radius: 1.946rem;
    `}
  `,
  sm: css`
    width: 22rem;
    height: 22rem;
    border-radius: 1.6rem;

    ${media.mo`
      width: 16.8rem;
      height: 16.8rem;
      border-radius: 1.2rem;
    `}
  `,
};

type SizeType = keyof typeof sizeStyles;

interface ProdImagesProps {
  $size: SizeType;
}

const ProdContainer = styled.div`
  ${flexColumn}
  gap: 1.6rem;
`;

const ProdImages = styled.div<ProdImagesProps>`
  overflow: hidden;
  ${({ $size }) => sizeStyles[$size] || ''}
`;

const ProdDesc = styled.div`
  ${flexColumn}
  gap: 0.6rem;

  h3 {
    ${font('14m')}
  }

  p {
    ${font('16b')}
  }
`;
