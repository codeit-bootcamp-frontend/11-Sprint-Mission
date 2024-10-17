import Img from "./ProductImg.style";

const ProductImg = ({ item }) => {
  return (
    <Img>
      <img src={item.images[0]} alt="상품 이미지" />
    </Img>
  );
};

export default ProductImg;
