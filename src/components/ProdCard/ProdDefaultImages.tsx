import PROD_DEFAULT from '../../assets/img_prod-default.svg';
import ProdDefaultContainer from './ProdDefaultImages.styles';

export interface ProdDefaultImagesProps {
  size: 'sm' | 'md';
}

function ProdDefaultImages({ size }: ProdDefaultImagesProps) {
  return (
    <ProdDefaultContainer size={size}>
      <img src={PROD_DEFAULT} alt='상품 이미지 없음' />
    </ProdDefaultContainer>
  );
}

export default ProdDefaultImages;
