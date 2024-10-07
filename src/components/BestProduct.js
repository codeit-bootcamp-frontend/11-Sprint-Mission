import '../styles/BestProduct.css';
import icHeart from '../assets/ic_heart.svg';

function BestProductsItem({ item }) {
  return (
    <div className="BestProductItem">
      <img className="BestProductItem-img" src={item.images} alt={item.name} />
      <div>
        <p className="BestProductName">{item.name}</p>
        <p className="BestProductPrice">{item.price}원</p>
        <p className="BestProductFavoriteCount">
          <img src={icHeart} alt="iconHert" />
          {item.favoriteCount}
        </p>
      </div>
    </div>
  );
}

function BestProduct({ items }) {
  return (
    <ul className="BestProduct">
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
