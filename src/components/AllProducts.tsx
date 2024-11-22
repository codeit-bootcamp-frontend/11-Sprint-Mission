import ProductCard from './ProductCard';
import { Product } from '../types/Product';
import './ProductCard.css';

type AllProductsProps = {
  products: Product[];
};

function AllProducts({ products }: AllProductsProps) {
  return (
    <div className="product-list all-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="all-product-card"
        />
      ))}
    </div>
  );
}

export default AllProducts;
