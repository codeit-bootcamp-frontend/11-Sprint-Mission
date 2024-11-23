import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Product {
  createdAt: Date;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

interface ItemCardProps {
  item: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <ItemCardWrapper to={`/items/${item.id}`}>
      <ItemCardImg src={item.images[0]} alt="이미지 미리보기" />
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
        <ItemFavoritCnt>
          <HeartIcon />
          {item.favoriteCount}
        </ItemFavoritCnt>
      </ItemInfo>
    </ItemCardWrapper>
  );
}

const ItemCardWrapper = styled(Link)`
  overflow: hidden;
  cursor: pointer;
  display: block;
`;

const ItemCardImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  margin-bottom: 16px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

const ItemName = styled.h2`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const ItemFavoritCnt = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;

export default ItemCard;
