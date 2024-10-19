import { Link, useNavigate } from "react-router-dom";
import "./EntireProducts.css";
import heart from "../assets/icons/ic_heart.svg";

function Product({ item }) {
  const { images, name, price, favoriteCount } = item;

  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate("/:productId");
  };

  return (
    <div className="entire-product" onClick={handleDetailClick}>
      <img src={images} alt={name} className="entire-product-img" />
      <div className="text-box">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-price">{price + "원"}</p>
        <div className="heart">
          <img src={heart} className="heart-img" alt="좋아요" />
          <p className="like-it">{favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function EntireProducts({ items }) {
  return (
    <div className="entire-products-container">
      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id}>
            <Link to={`/items/${item.id}`}>
              <Product item={item} />
            </Link>
          </div>
        ))
      ) : (
        <p>상품을 준비중입니다.</p>
      )}
    </div>
  );
}

export default EntireProducts;
