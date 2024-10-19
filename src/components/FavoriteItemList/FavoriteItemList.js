import "./FavoriteItemList";
import heartImg from "../../images/icons/ic_heart.svg";

function GetItemList({ item }) {
  return (
    <div className="bestItemList">
      <img className="itemsImg" src={item.imagesUrl} alt={item.name} />
      <div>
        <h1>{item.name}</h1>
        <p>{item.price}원</p>
        <img src={heartImg} alt="좋아요" />
        <span>{item.favoriteCount}</span>
      </div>
    </div>
  );
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <GetItemList item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ItemList;
