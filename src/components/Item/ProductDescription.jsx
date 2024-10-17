import Description from "./ProductDescription.style";

const ProductDescription = ({ item }) => {
  return (
    <Description>
      <h3>상품 소개</h3>
      <p>{item.description}</p>
    </Description>
  );
};

export default ProductDescription;
