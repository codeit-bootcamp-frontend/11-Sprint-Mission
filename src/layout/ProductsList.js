import HeartCountArea from "../components/HeartCountArea";
import ProductImage from "../components/Product/ProductImage";
import ProductName from "../components/Product/ProductName";
import ProductPrice from "../components/Product/ProductPrice";
import "../styles/Products/ProductsList.css";

const ProductsList = ({ list }) => {
  return (
    <div className='product-area'>
      <div className='product-category'>
        <h2 className='product-category-name'>베스트 상품</h2>
      </div>
      <ul className='product-list'>
        {list.map((item) => (
          <li key={item.id} className='product-item'>
            <ProductImage images={item.images} size='middle' />
            <div className='product-content'>
              <ProductName name={item.name} />
              <ProductPrice price={item.price} />
              <HeartCountArea count={item.favoriteCount} size='small' />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
