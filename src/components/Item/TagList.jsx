const TagList = ({ item }) => {
  return (
    <ul>
      {item.tags.map((tag) => {
        return <li key={item.id}>#{tag}</li>;
      })}
    </ul>
  );
};

export default TagList;
