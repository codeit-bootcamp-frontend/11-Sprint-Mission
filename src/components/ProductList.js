function ProductListItem({ item }) {
  return (
    <div className="ProductListItem">
      <img className="ProductListItem-img" src={item.images} alt={item.name} />
      <div>
        <p className="productName">{item.name}</p>
        <p className="productPrice">{item.price}</p>
        <p className="productFavoriteCount">{item.favoriteCount}</p>
      </div>
    </div>
  );
}

function ProductList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ProductListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ProductList;
