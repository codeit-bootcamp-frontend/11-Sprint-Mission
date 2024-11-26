import React from 'react';
import testImage from '@/public/testImage.png';
import Image from 'next/image';
import styles from './Card.module.css';
import heartIcon from '@/public/ic_heart.svg';
import profile from '@/public/profile.svg';
import { ProductResult } from '@/api/productApi';

interface CardProps {
  products: ProductResult;
}

const Card: React.FC<CardProps> = ({ products }) => {
  const { description, ownerNickname, favoriteCount, createdAt, images } =
    products;

  return (
    <>
      <div className={styles.CardBox}>
        <div className={styles.CardContent}>
          <div className={styles.bestContentText}>{description}</div>
          <div className={styles.bestContentImage}>
            <Image
              src={images[0]}
              width={48}
              height={48}
              alt="상품이미지"
            ></Image>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.bestContentLeft}>
            <Image
              src={profile}
              width={24}
              height={24}
              alt="프로파일이미지"
            ></Image>
            <div className={styles.nickName}>{ownerNickname}</div>
            <div className={styles.date}>{createdAt}</div>
          </div>
          <div className={styles.heartCount}>
            <Image
              src={heartIcon}
              width={24}
              height={24}
              alt="좋아요버튼"
            ></Image>
            <div className={styles.heartCountNum}>{favoriteCount}+</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
