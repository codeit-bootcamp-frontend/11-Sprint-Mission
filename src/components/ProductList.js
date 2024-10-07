import '../styles/ProductList.css';
import icHeart from '../assets/ic_heart.svg';

function ProductListItem({ item }) {
  return (
    <div className="ProductListItem">
      <img className="ProductListItem-img" src={item.images} alt={item.name} />
      <div>
        <p className="productName">{item.name}</p>
        <p className="productPrice">{item.price}원</p>
        <p className="productFavoriteCount">
          <img src={icHeart} alt="iconHerat" />
          {item.favoriteCount}
        </p>
      </div>
    </div>
  );
}

function ProductList({ items }) {
  return (
    <ul className="ProductList">
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
