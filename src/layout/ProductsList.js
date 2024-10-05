import ProductManagement from "../components/Product/ProductManagement";
import ProductItem from "../components/Product/ProductItem";
import { ProductProvider } from "../context/ProductContext";

const ProductsList = ({
  list,
  imageSize,
  countSize,
  children,
  onSubmit,
  productManagement,
  onBest,
  onNewest,
  isLoading,
  className,
}) => {
  return (
    <ProductProvider imageSize={imageSize} countSize={countSize}>
      <div className={`product-area ${className}`}>
        <div className='product-category'>
          <h2 className='product-category-name'>{children}</h2>
          {productManagement ? <ProductManagement onSubmit={onSubmit} onBest={onBest} onNewest={onNewest} /> : ""}
        </div>
        {isLoading && <p>로딩 중 입니다...</p>}
        <ul className='product-list'>
          {list.map((item) => (
            <li key={item.id} className='product-item'>
              <ProductItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </ProductProvider>
  );
};

export default ProductsList;
