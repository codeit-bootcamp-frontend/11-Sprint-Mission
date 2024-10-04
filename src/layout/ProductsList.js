import HeartCountArea from "../components/HeartCountArea";
import ProductImage from "../components/Product/ProductImage";
import ProductName from "../components/Product/ProductName";
import ProductPrice from "../components/Product/ProductPrice";
import "../styles/Products/ProductsList.css";

const ProductItem = ({ item, imageSize, countSize }) => {
  return (
    <>
      <ProductImage images={item.images} size={imageSize} />
      <div className='product-content'>
        <ProductName name={item.name} />
        <ProductPrice price={item.price} />
        <HeartCountArea count={item.favoriteCount} size={countSize} />
      </div>
    </>
  );
};

const ProductsList = ({ list, imageSize, countSize, children }) => {
  return (
    <div className='product-area'>
      <div className='product-category'>
        <h2 className='product-category-name'>{children}</h2>
      </div>
      <ul className='product-list'>
        {list.map((item) => (
          <li key={item.id} className='product-item'>
            <ProductItem item={item} imageSize={imageSize} countSize={countSize} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
