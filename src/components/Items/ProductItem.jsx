import HeartCountArea from "../common/HeartCountArea";
import Images from "../common/Images";

const ProductItem = ({ item, imageSize }) => {
  const priceReplace = item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <Images
        imageSize={imageSize}
        src={item.images}
        alt={`${item.name} 이미지`}
      />
      <div className="product-content">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-price">{priceReplace}원</p>
        <HeartCountArea count={item.favoriteCount} style="small" />
      </div>
    </>
  );
};

export default ProductItem;
