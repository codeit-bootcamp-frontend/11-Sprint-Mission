import ProductCard from './ProductCard';
import { Product } from '../types/Product';
import './ProductCard.css';

type BestProductsProps = {
  products: Product[];
};

function BestProducts({ products }: BestProductsProps) {
  return (
    <div className="product-list best-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="best-product-card"
        />
      ))}
    </div>
  );
}

export default BestProducts;
