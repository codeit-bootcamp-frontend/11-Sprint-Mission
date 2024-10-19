import ProductCard from "./ProductCard";
import "./BestProducts.css";

const BestProducts = ({ products }) => {
  return (
    <div className="bestproducts-container">
      <h2 className="bestproducts-title">베스트 상품</h2>
      <div className="bestcards-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
