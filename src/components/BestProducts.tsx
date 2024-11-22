import ProductCard from './ProductCard';
import './ProductCard.css';

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
};

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
