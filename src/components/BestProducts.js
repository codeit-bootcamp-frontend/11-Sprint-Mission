import "./BestProducts.css";
import heart from "../images/Icon.svg";

function ProductsList({ item }) {
  const { images, name, price, favoriteCount } = item;

  return (
    <div className="best-product">
      <img src={images} alt={name} className="best-product-img" />
      <div className="text-box">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-price">{price}</p>
        <div className="heart">
          <img src={heart} alt="좋아요" />
          <p className="like-it">{favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function BestProducts({ items }) {
  return (
    <div className="best-products-container">
      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id}>
            <ProductsList item={item} />
          </div>
        ))
      ) : (
        <p>상품을 준비중입니다.</p>
      )}
    </div>
  );
}

export default BestProducts;
