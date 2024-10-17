import '../styles/ProductList.css';
import icHeart from '../assets/ic_heart.svg';
import { NavLink } from 'react-router-dom';

function ProductList({ items }) {
  return (
    <ul className="ProductList">
      {items.map((item) => (
        <li key={item.id}>
          <NavLink to={`/items/${item.id}`}>
            <div className="ProductListItem">
              <img
                className="ProductListItem-img"
                src={item.images}
                alt={item.name}
              />
              <div>
                <p className="productName">{item.name}</p>
                <p className="productPrice">{item.price}원</p>
                <p className="productFavoriteCount">
                  <img src={icHeart} alt="iconHerat" />
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

export default ProductList;
