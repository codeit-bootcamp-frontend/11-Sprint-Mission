import styled from 'styled-components';

import PROD_DEFAULT from '../../assets/img_prod-default.svg';

const ProdDefaultContainer = styled.div`
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
      width: ${({ $size }) => ($size === 'sm' ? '9.274rem' : '11.6rem')};
      height: ${({ $size }) => ($size === 'sm' ? '10.887rem' : '13.6rem')};
    }
  }
`;

function ProdDefaultImages({ size }) {
  return (
    <ProdDefaultContainer $size={size}>
      <img src={PROD_DEFAULT} alt='상품 이미지 없음' />
    </ProdDefaultContainer>
  );
}

export default ProdDefaultImages;
