import styled from 'styled-components';

const PROD_DEFAULT = '/img_prod-default.svg';

export interface ProdDefaultImagesProps {
  size?: 'sm' | 'md';
}

function ProdDefaultImages({ size }: ProdDefaultImagesProps) {
  return (
    <ProdDefaultContainer size={size}>
      <img src={PROD_DEFAULT} alt='상품 이미지 없음' />
    </ProdDefaultContainer>
  );
}

export default ProdDefaultImages;

const ProdDefaultContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<ProdDefaultImagesProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--gray-50);
  img {
    width: 11.6rem;
    height: 13.6rem;
  }
  @media screen and (max-width: 767px) {
    img {
      width: ${({ size }) => (size === 'sm' ? '9.274rem' : '11.6rem')};
      height: ${({ size }) => (size === 'sm' ? '10.887rem' : '13.6rem')};
    }
  }
`;
