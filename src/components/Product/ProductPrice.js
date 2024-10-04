const ProductPrice = ({ price }) => {
  const priceReplace = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return <p className='product-price'>{priceReplace}원</p>;
};

export default ProductPrice;
