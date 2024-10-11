import ProductCard from './ProductCard';
import './ProductCard.css';

function AllProducts({ products }) {
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
