function Item({ item }) {
  return (
    <div className="Item">
      <img src={item.images[0]} alt={item.name} />
      <h4>{item.name}</h4>
      <p>{`${item.price}원`}</p>
      <p>{item.favoriteCount}</p>
    </div>
  );
}

export default Item;
