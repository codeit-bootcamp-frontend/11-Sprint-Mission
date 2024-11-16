import ProdCard from '../../components/ProdCard/ProdCard';
import ProdList from './ProductsList.styles';

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
