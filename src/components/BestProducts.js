import { Link, useNavigate } from "react-router-dom";
import "./BestProducts.css";
import heart from "../assets/icons/ic_heart.svg";

function Product({ item }) {
  const { images, name, price, favoriteCount } = item;
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate("/:productId");
  };

  return (
    <div className="best-product" onClick={handleDetailClick}>
      <img src={images} alt={name} className="best-product-img" />
      <div className="text-box">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{price + "원"}</p>
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

export default BestProducts;
