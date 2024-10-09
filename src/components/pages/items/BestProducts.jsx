import ProductCard from "./ProductCard";

function BestProducts({ bestProducts }) {
  return (
    <section className="best-products">
      <p className="products-caption">베스트 상품</p>
      <div className="best-products-list">
        {bestProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestProducts;
