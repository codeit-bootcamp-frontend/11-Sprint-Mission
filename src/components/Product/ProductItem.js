import HeartCountArea from "../HeartCountArea";
import ProductImage from "./ProductImage";
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";

const ProductItem = ({ item }) => {
  return (
    <>
      <ProductImage images={item.images} />
      <div className='product-content'>
        <ProductName name={item.name} />
        <ProductPrice price={item.price} />
        <HeartCountArea count={item.favoriteCount} />
      </div>
    </>
  );
};

export default ProductItem;
