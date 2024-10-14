import ProductCard from "./ProductCard";

const BestProducts = ({ products }) => {
  return (
    <>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default BestProducts;
