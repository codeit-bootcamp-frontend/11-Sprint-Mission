import Image from 'next/image';
import React from 'react';
import styles from './BestCard.module.css';
import medalIcon from '@/public/ic_medal.svg';
import testImage from '@/public/testImage.png';
import heartIcon from '@/public/ic_heart.svg';
import { ProductResult } from '@/api/productApi';

interface BestCardProps {
  bestProducts: ProductResult;
}

const BestCard: React.FC<BestCardProps> = ({ bestProducts }: BestCardProps) => {
  const { description, ownerNickname, favoriteCount, createdAt, images } =
    bestProducts;

  return (
    <div className={styles.bestContentBox}>
      <div className={styles.bestProductBadge}>
        <div className={styles.medalIcon}>
          <Image src={medalIcon} alt="베스트상품"></Image>
        </div>
        <div className={styles.badgeTitle}>Best</div>
      </div>
      <div className={styles.bestProductInfo}>
        <div className={styles.bestContent}>
          <div className={styles.bestContentText}>{description}</div>
          <div className={styles.bestContentImage}>
            <Image src={testImage} alt="베스트상품이미지"></Image>
          </div>
        </div>
        <div className={styles.bestContentDt}>
          <div className={styles.bestContentLeft}>
            <div className={styles.nickName}>{ownerNickname}</div>
            <div className={styles.heartCount}>
              <div className={styles.heartCountNum}>{favoriteCount}+</div>
            </div>
          </div>
          <div className={styles.date}>{createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default BestCard;
