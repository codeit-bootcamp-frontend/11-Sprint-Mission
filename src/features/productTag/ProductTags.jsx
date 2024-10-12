import ProductTag from "./ProductTag";

const ProductTags = ({ tags, onDeleteTag }) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {tags.map((tag, index) => (
        <ProductTag key={index} tag={tag} onDelete={() => onDeleteTag(index)} />
      ))}
    </div>
  );
};

export default ProductTags;
