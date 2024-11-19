import ProdCard from '../../components/ProdCard/ProdCard';
import ProdList from './ProductsList.styles';

// ProductItem 타입 정의
interface ProductItem {
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
  images: string;
}

// ProductsList의 prop 타입 정의
interface ProductsListProps {
  list: ProductItem[];
  size?: 'sm' | 'md';
}

function ProductsList({ list, size }: ProductsListProps) {
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
