import ProductItem from "./ProductItem";

const ProductsList = ({ list, imageSize }) => {
  return (
    <ul className='product-list'>
      {list.map((item) => (
        <li key={item.id} className='product-item'>
          <ProductItem item={item} imageSize={imageSize} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
