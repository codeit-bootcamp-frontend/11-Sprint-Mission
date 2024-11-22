import Image from 'next/image';
import React from 'react';
import styles from './BestCard.module.css';
import medalIcon from '@/public/ic_medal.svg';
import testImage from '@/public/testImage.png';
import heartIcon from '@/public/ic_heart.svg';

const BestCard = () => {
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
          <div className={styles.bestContentText}>
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </div>
          <div className={styles.bestContentImage}>
            <Image src={testImage} alt="베스트상품이미지"></Image>
          </div>
        </div>
        <div className={styles.bestContentDt}>
          <div className={styles.bestContentLeft}>
            <div className={styles.nickName}>총명한판다</div>
            <div className={styles.heartCount}>
              <Image src={heartIcon} alt="좋아요버튼"></Image>
              <div className={styles.heartCountNum}>9999+</div>
            </div>
          </div>
          <div className={styles.date}>2024.04.16</div>
        </div>
      </div>
    </div>
  );
};

export default BestCard;
