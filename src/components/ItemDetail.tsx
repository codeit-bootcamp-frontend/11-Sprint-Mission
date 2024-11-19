import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from '../api/api';
import SelectBox from './SelectBox';
import Tag from './Tag';
import Character from '../assets/images/character.svg';
import Heart from '../assets/icons/ic_heart.svg';
import './ItemDetail.css';

interface ItemData {
  images: string[];
  name: string;
  price: number;
  description: string;
  tags: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}

function formatDate(value: string | undefined): string {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

const ItemDetail: FC = () => {
  const { productId } = useParams<Record<string, string | undefined>>(); // useParams 반환 타입을 명시
  const [getData, setGetData] = useState<ItemData | null>(null);

  const handleLoadData = async () => {
    if (!productId) return; // productId가 없는 경우 처리
    try {
      const params = { productId: Number(productId) }; // productId를 number로 변환
      const result = await getItem(params);
      setGetData(result);
    } catch (error) {
      console.error('Failed to fetch item data:', error);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, [productId]);

  return (
    <div className="item-detail-content">
      {getData?.images?.[0] && (
        <img alt="상품사진" src={getData.images[0]} className="item-img" />
      )}
      <div className="item-detail-text">
        <div className="description">
          <section className="detail-head">
            <div className="item-info">
              <div className="item-title">
                <h2 className="item-detail-name">{getData?.name}</h2>
                <SelectBox />
              </div>
              <div className="item-price">
                <p className="item-detail-price">{getData?.price?.toLocaleString()}원</p>
              </div>
            </div>
          </section>
          <section className="detail-body">
            <div className="item-description">
              <h3 className="item-description-theme">상품소개</h3>
              <p className="item-description-content">{getData?.description}</p>
            </div>
            <div className="item-tags">
              <h3 className="item-description-theme">상품태그</h3>
              <div className="detail-tags">
                {getData?.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="seller-space">
          <div className="seller">
            <img src={Character} alt="캐릭터" />
            <div className="seller-info">
              <p className="seller-nickname">{getData?.ownerNickname}</p>
              <p className="selling-updatedAt">{formatDate(getData?.createdAt)}</p>
            </div>
          </div>
          <div className="like-button">
            <button className="button-content">
              <img src={Heart} alt="좋아요" />
              <p>{getData?.favoriteCount}</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetail;