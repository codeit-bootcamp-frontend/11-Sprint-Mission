import { styled } from 'styled-components';
import ProdCard from '../../components/ProdCard/ProdCard';
import { media } from '../../styles/media.styles';

const ProdList = styled.div`
  display: flex;
  gap: 2.4rem;
  flex-wrap: wrap;

  ${media.ta`
    gap : ${({ size }) => (size ? '1.6rem' : '1rem')};
  `}

  ${media.mo`
    gap : 0.8rem;
  `}
`;

function ProductsList({ list, size }) {
  return (
    <ProdList size={size}>
      {list.map((item) => (
        <li key={item.id}>
          <ProdCard
            id={item.id}
            size={size}
            title={item.name}
            price={item.price}
            count={item.favoriteCount}
            src={item.images}
          />
        </li>
      ))}
    </ProdList>
  );
}

export default ProductsList;
