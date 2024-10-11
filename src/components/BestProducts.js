import ProductCard from './ProductCard';
import './ProductCard.css';

function BestProducts({ products }) {
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
