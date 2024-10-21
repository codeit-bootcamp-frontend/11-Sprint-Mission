import Tag from "./ProductTag.style";

const ProductTag = ({ item }) => {
  return (
    <Tag>
      <h3>상품 태그</h3>

      <ul>
        {item.tags.map((tag) => {
          return <li key={item.id}>#{tag}</li>;
        })}
      </ul>
    </Tag>
  );
};

export default ProductTag;
