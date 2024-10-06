import "./EntireProducts.css";
import heart from "../images/heart.svg";

function ProductsList({ item }) {
  const { images, name, price, favoriteCount } = item;

  return (
    <div className="product">
      <img src={images} alt={name} className="product-img" />
      <div className="text-box">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-price">{price}</p>
        <a src={heart} className="like-it">
          {favoriteCount}
        </a>
      </div>
    </div>
  );
}

function EntireProducts({ items }) {
  return (
    <div className="entire-products">
      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id}>
            <ProductsList item={item} />
          </div>
        ))
      ) : (
        <p>비어있는 값입니다..</p>
      )}
    </div>
  );
}

export default EntireProducts;
