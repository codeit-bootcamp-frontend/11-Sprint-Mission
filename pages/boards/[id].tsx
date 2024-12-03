import React from 'react';
import Iconkebab from '@/public/ic_kebab.svg';
import Image from 'next/image';
import styles from '@/styles/BoardDetail.module.css';
import profile from '@/public/profile.svg';
import heartIcon from '@/public/ic_heart.svg';
import Input from '@/components/common/Input';
import { GetServerSidePropsContext } from 'next';
import { getProductById, ProductResult } from '@/api/productApi';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.params) {
    const productId = Number(context.params.id);

    try {
      const detailResponse = await getProductById(productId);

      return {
        props: {
          detailProduct: detailResponse.data,
        },
      };
    } catch (error) {
      console.error('데이터를 불러오는 데 실패했습니다:', error);
      return {
        props: {
          detailProduct: {},
        },
      };
    }
  }
}

const BoardDetail = ({ detailProduct }: { detailProduct: ProductResult }) => {
  return (
    <>
      <div className={styles.boardDetail}>
        <div className={styles['board-detail-content']}>
          <div className={styles['board-detail-header']}>
            <div className={styles['board-detail-title']}>
              <h1>{detailProduct.name}</h1>
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
                <div className={styles.nickName}>
                  {detailProduct.ownerNickname}
                </div>
                <div className={styles.date}>{detailProduct.createdAt}</div>
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
                    <div className={styles.heartCountNum}>
                      +{detailProduct.favoriteCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content}>{detailProduct.description}</div>
        </div>
        <div className={styles.comment}>
          <h2>댓글달기</h2>
          <Input
            // onInput={handleSearch}
            name="content"
            addClassName={styles.board}
            placeholder="댓글을 입력해주세요."
          />
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
