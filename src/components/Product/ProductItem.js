import HeartCountArea from "../HeartCountArea";

const ProductItem = ({ item, imageSize }) => {
  const priceReplace = item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <div className={`product-images ${imageSize}`}>
        <img src={item.images} alt={`${item.name} 이미지`} />
      </div>
      <div className='product-content'>
        <h3 className='product-name'>{item.name}</h3>
        <p className='product-price'>{priceReplace}원</p>
        <HeartCountArea count={item.favoriteCount} />
      </div>
    </>
  );
};

export default ProductItem;
