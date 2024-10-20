import ItemTag from "./ItemTag";

const ItemTags = ({ tags, onDeleteTag }) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {tags.map((tag, index) => (
        <ItemTag key={index} tag={tag} onDelete={() => onDeleteTag(index)} />
      ))}
    </div>
  );
};

export default ItemTags;
