import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../assets/noImage.jfif';
import favoriteIcon from '../../assets/favoriteIcon.png';
import '@/css/Items.css';

// Product 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
  images: string[];
}

// props 타입 정의
interface ItemListProps {
  className?: string;
  item: Product;
}

const ItemList: React.FC<ItemListProps> = ({ className, item }) => {
  const { images, name, price, favoriteCount } = item;

  return (
    <div className={className}>
      <Link to={`/items/${item.id}`}>
        <img className="thumbnail" src={images[0] || noImage} alt={name} />
        <h2>{name}</h2>
        <p className="price">{`${Number(price).toLocaleString()}원`}</p>
      </Link>
      <div className="favorite">
        <img src={favoriteIcon} alt="좋아요" />
        <p>{favoriteCount}</p>
      </div>
    </div>
  );
};

export default ItemList;
