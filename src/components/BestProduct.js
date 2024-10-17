import '../styles/BestProduct.css';
import icHeart from '../assets/ic_heart.svg';
import { NavLink } from 'react-router-dom';

function BestProduct({ items }) {
  return (
    <ul className="BestProductList">
      {items.map((item) => (
        <li key={item.id}>
          <NavLink to={`/items/${item.id}`}>
            <div className="BestProductItem">
              <img
                className="BestProductItem-img"
                src={item.images}
                alt={item.name}
              />
              <div>
                <p className="BestProductName">{item.name}</p>
                <p className="BestProductPrice">{item.price}원</p>
                <p className="BestProductFavoriteCount">
                  <img src={icHeart} alt="iconHert" />
                  {item.favoriteCount}
                </p>
              </div>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default BestProduct;
