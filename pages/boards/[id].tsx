import React from 'react';
import Iconkebab from '@/public/ic_kebab.svg';
import Image from 'next/image';
import styles from '@/styles/BoardDetail.module.css';
import profile from '@/public/profile.svg';
import heartIcon from '@/public/ic_heart.svg';
import Input from '@/components/common/Input';

const BoardDetail = () => {
  return (
    <>
      <div className={styles.boardDetail}>
        <div className={styles['board-detail-content']}>
          <div className={styles['board-detail-header']}>
            <div className={styles['board-detail-title']}>
              <h1>
                맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
              </h1>
              <Image src={Iconkebab} alt=""></Image>
            </div>
            <div className={styles.profile}>
              <Image
                src={profile}
                width={24}
                height={24}
                alt="프로파일이미지"
              ></Image>
              <div className={styles['profile-info']}>
                <div className={styles.nickName}>총명한판다</div>
                <div className={styles.date}>2024. 01. 02</div>
              </div>
              <div>
                <div className={styles['heart-box']}>
                  <div className={styles.liner}></div>
                  <div className={styles.heartCount}>
                    <Image
                      src={heartIcon}
                      width={24}
                      height={24}
                      alt="좋아요버튼"
                    ></Image>
                    <div className={styles.heartCountNum}>+123</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </div>
        </div>
        <div className={styles.comment}>
          <h2>댓글달기</h2>
          <Input
            // onInput={handleSearch}
            addClassName={styles.board}
            placehorder="댓글을 입력해주세요."
          />
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
