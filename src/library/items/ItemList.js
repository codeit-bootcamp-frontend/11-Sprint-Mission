import noImage from '../../assets/noImage.jfif';
import favoriteIcon from '../../assets/favoriteIcon.png';
import { Link } from 'react-router-dom';

function ItemList({ item }) {
  const { images, name, price, favoriteCount } = item;

  return (
    <div>
      <Link to={`/items/${item.id}`}>
        <img
          className="thumbnail"
          src={images}
          onError={(e) => (e.target.src = noImage)}
          alt={name}
        />
        <h2>{name}</h2>
        <p className="price">{`${Number(price).toLocaleString()}원`}</p>
      </Link>
      <div className="favorite">
        <img src={favoriteIcon} alt="좋아요" />
        <p>{favoriteCount}</p>
      </div>
    </div>
  );
}

export default ItemList;
