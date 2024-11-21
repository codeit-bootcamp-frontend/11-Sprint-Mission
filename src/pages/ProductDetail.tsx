import { useParams, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getProductDetail } from '../hooks/api';
import iconHeart from '../assets/ic_heart.svg';
import defaultImg from '../assets/img_default.svg';
import frame from '../assets/Frame.svg';
import styles from '../styles/ProductDetail.module.css';
import ProductDetailComment from '../components/ProductDetail/ProductDetailComment';
import ProductDetailInput from '../components/ProductDetail/ProductDetailInput';

// 상품 상세 데이터 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: any;
  tags: string[];
  ownerNickname: string;
  updatedAt: string;
  favoriteCount: number;
}

// 날짜 형식 변환 함수
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 두 자릿수로
  const day = String(date.getDate()).padStart(2, '0'); // 두 자릿수로
  return `${year}.${month}.${day}`;
};

function ProductDetail() {
  const { productId } = useParams<{ productId: any }>(); // URL 파라미터 타입 정의
  const [product, setProduct] = useState<Product | null>(null); // 상품 상세 정보

  // 상품 상세 정보 불러오기
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        if (productId) {
          const productDetail: Product = await getProductDetail(productId);
          setProduct(productDetail);
        }
      } catch (error: any) {
        console.error('상품 상세 정보를 불러오는 중 오류 발생:', error.message);
      }
    };
    fetchProductDetail();
  }, [productId]);

  // 비동기 처리 중 product가 null일 때 발생하는 오류 방지
  if (!product) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  // 이미지가 없을 경우 대체 이미지 설정
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : defaultImg;

  return (
    <div className={styles.productDetail}>
      <div className={styles.productDetailContent}>
        <img
          src={imageSrc}
          alt={product.name}
          className={styles.PDProductImg}
        />
        <div className={styles.productDetailText}>
          <div>
            <p className={styles.productDetailName}>{product.name}</p>
            <p className={styles.productDetailPrice}>
              {product.price.toLocaleString()}원
            </p>
          </div>
          <div className={styles.PDDivDescription}>
            <div>
              <p className={styles.pdSubTitle}>상품 소개</p>
              <p className={styles.productDetailDescription}>
                {product.description}
              </p>
            </div>
            <div>
              <p className={styles.pdSubTitle}>상품 태그</p>
              <div className={styles.productDetailTags}>
                {product.tags.map((tag, index) => (
                  <p key={index} className={styles.tagItem}>
                    #{tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.PDBottomSection}>
            <div className={styles.pdSubfooter}>
              <img src={frame} className={styles.frameImg} alt="owner frame" />
              <div className={styles.PDEditInfo}>
                <p className={styles.productDetailNickname}>
                  {product.ownerNickname}
                </p>
                <p className={styles.productDetailUpdateAt}>
                  {formatDate(product.updatedAt)} {/* 날짜 형식 변환 */}
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
      <NavLink to="/items" className={styles.goTitle}>
        <button className={styles.goTitleButton}>목록으로 돌아가기</button>
      </NavLink>
    </div>
  );
}

export default ProductDetail;
