const AllProductItem = ({ item }) => {
  return (
    <article>
      <figure>
        <img src={item.images} alt={item.name} />
      </figure>

      <dl>
        <dt>{item.name}</dt>
        <dd>{item.price.toLocaleString()}원</dd>
      </dl>

      <span className="allProduct__like">{item.favoriteCount}</span>
    </article>
  );
};

export default AllProductItem;
