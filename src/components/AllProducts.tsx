import ProductCard from './ProductCard';
import './ProductCard.css';

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
};

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
