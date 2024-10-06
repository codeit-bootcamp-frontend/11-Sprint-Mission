function ProductsListItem({ item }) {
  const { images, name, price, favoriteCount } = item;

  return (
    <div className="productsListItem">
      <img src={images} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
      <div>{favoriteCount}</div>
    </div>
  );
}

function ProductsList({ items }) {
  if (!items || items.length === 0) {
    return <div>상품이 없습니다. 불러오기 버튼을 눌러주세요.</div>;
  }

  return (
    <ul className="ProductsList">
      {items.list.map((item) => (
        <li key={item.id}>
          <ProductsListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
