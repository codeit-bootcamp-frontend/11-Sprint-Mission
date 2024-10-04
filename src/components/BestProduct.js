function BestProductsItem({ item }) {
  return (
    <div className="BestProductItem">
      <img className="BestProductItem-img" src={item.images} alt={item.name} />
      <div>
        <p className="BestProductName">{item.name}</p>
        <p className="BestProductPrice">{item.price}</p>
        <p className="BestProductFavoriteCount">{item.favoriteCount}</p>
      </div>
    </div>
  );
}

function BestProduct({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <BestProductsItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default BestProduct;
