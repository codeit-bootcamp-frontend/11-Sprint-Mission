import React from 'react';
import testImage from '@/public/testImage.png';
import Image from 'next/image';
import styles from './Card.module.css';
import heartIcon from '@/public/ic_heart.svg';
import profile from '@/public/profile.svg';

const Card = () => {
  return (
    <>
      <div className={styles.CardBox}>
        <div className={styles.CardContent}>
          <div className={styles.bestContentText}>
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </div>
          <div className={styles.bestContentImage}>
            <Image src={testImage} alt="베스트상품이미지"></Image>
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
            <div className={styles.nickName}>총명한판다</div>
            <div className={styles.date}>2024.04.16</div>
          </div>
          <div className={styles.heartCount}>
            <Image
              src={heartIcon}
              width={24}
              height={24}
              alt="좋아요버튼"
            ></Image>
            <div className={styles.heartCountNum}>9999+</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
