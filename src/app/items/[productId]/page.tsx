'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // App Router의 useParams
import { getProductDetail } from '../../../hooks/api';
import iconHeart from '../../../assets/ic_heart.svg';
import defaultImg from '../../../assets/img_default.svg';
import frame from '../../../assets/Frame.svg';
import styles from '../../../styles/ProductDetail.module.css';
import ProductDetailComment from '../../../components/ProductDetail/ProductDetailComment';
import ProductDetailInput from '../../../components/ProductDetail/ProductDetailInput';
import Link from 'next/link';

// 상품 데이터 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  tags: string[];
  ownerNickname: string;
  updatedAt: string;
  favoriteCount: number;
}

// 날짜 포맷팅 함수
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(date.getDate()).padStart(2, '0')}`;
};

export default function ProductDetail() {
  const { productId } = useParams(); // URL 파라미터 가져오기
  const [product, setProduct] = useState<Product | null>(null);

  // 상품 상세 정보 불러오기
  useEffect(() => {
    const fetchProductDetail = async () => {
      if (productId) {
        try {
          const productDetail: Product = await getProductDetail(
            Number(productId)
          );
          setProduct(productDetail);
        } catch (error: any) {
          console.error('상품 상세 정보 불러오기 오류:', error.message);
        }
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  const imageSrc = product.images?.length ? product.images[0] : defaultImg;

  return (
    <div className={styles.productDetail}>
      <div className={styles.productDetailContent}>
        <img
          src={imageSrc}
          alt={product.name}
          className={styles.PDProductImg}
        />
        <div className={styles.productDetailText}>
          <p className={styles.productDetailName}>{product.name}</p>
          <p className={styles.productDetailPrice}>
            {product.price.toLocaleString()}원
          </p>
          <p className={styles.productDetailDescription}>
            {product.description}
          </p>
          <div className={styles.productDetailTags}>
            {product.tags.map((tag, index) => (
              <span key={index} className={styles.tagItem}>
                #{tag}
              </span>
            ))}
          </div>
          <div className={styles.PDBottomSection}>
            <div className={styles.pdSubfooter}>
              <img src={frame} className={styles.frameImg} alt="owner frame" />
              <div className={styles.PDEditInfo}>
                <p className={styles.productDetailNickname}>
                  {product.ownerNickname}
                </p>
                <p className={styles.productDetailUpdateAt}>
                  {formatDate(product.updatedAt)}
                </p>
              </div>
            </div>
            <p className={styles.productDetailIsFavorite}>
              <img src={iconHeart} alt="favorite icon" />
              {product.favoriteCount}
            </p>
          </div>
        </div>
      </div>
      <ProductDetailInput productId={Number(productId)} />
      <ProductDetailComment productId={Number(productId)} />
      <Link href="/items">
        <button className={styles.goTitleButton}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}
