import ProductCard from "./ProductCard";
import "./BestProducts.css";

const BestProducts = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default BestProducts;
