import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/api';
import useAsync from '../hooks/useAsync';
import dayjs from 'dayjs';
//
import Loading from '../Components/Loading';
import Tag from '../Components/Tag';
import CommentWriteForm from '../Components/CommentWriteForm';
import Comments from '../Components/Comments';
import Img from '../Components/Img';
//
import baseAvatar from '../assets/base-avatar.svg';
import styles from './Item.module.css';

/**
 * 상품 상세 페이지
 * @return {JSX}
 */
function Item() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isProductLoading, productLoadingError, getProductAsync] = useAsync(getProduct);

  useEffect(() => {
    const handleLoad = async () => {
      const result = await getProductAsync(productId);
      if (!result) return;

      setProduct(result);
      // console.log('product', product);
    };

    handleLoad();
  }, []);

  return (
    <>
      <Loading visible={isProductLoading} />
      {productLoadingError?.message && (
        <p className="error-message">{productLoadingError.message}</p>
      )}
      {product && (
        <div className="flex flex-col md:flex-row gap-6 my-6">
          <figure className={styles.productImage}>
            <Img src={product.images[0]} alt={product.name} />
          </figure>

          <div className="flex flex-col gap-4 flex-1">
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.price}>{product.price.toLocaleString()}원</div>
            <hr />
            <dl className={styles.detail}>
              <dt>상품 소개</dt>
              <dd>{product.description}</dd>
              <dt>상품 태그</dt>
              <dd className="flex flex-wrap gap-2">
                {product.tags.length ? product.tags.map((tag) => <Tag key={tag}>{tag}</Tag>) : '-'}
              </dd>
            </dl>

            <div className="flex gap-6 items-center">
              <div className="flex gap-4 items-center mr-auto">
                <img
                  src={baseAvatar}
                  alt={`${product.ownerNickname} 썸네일`}
                  width="40"
                  height="40"
                />
                <div>
                  <div className={styles.user}>{product.ownerNickname}</div>
                  <div className={styles.date}>
                    {dayjs(product.createdAt).format('YYYY. MM. DD')}
                  </div>
                </div>
              </div>
              <span className="v-bar"></span>
              <div className={styles.favorite}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.12025 18.1482C6.1133 18.1421 6.1065 18.1361 6.09984 18.1302V18.0272L5.83623 17.7636C4.39552 16.3229 3.5665 14.4149 3.5665 12.4V12.1474C3.69211 8.24257 7.02101 5.03333 10.9332 5.03333C11.5506 5.03333 12.3377 5.24515 13.1065 5.65909C13.8429 6.0556 14.4984 6.60339 14.9351 7.22713C15.4083 8.27379 16.9116 8.25737 17.3525 7.17788C17.7207 6.52332 18.3603 5.95126 19.1049 5.53603C19.873 5.10766 20.656 4.9 21.1998 4.9C25.2271 4.9 28.4406 8.09104 28.5665 12.1469V12.4C28.5665 14.563 27.7281 16.4504 26.325 17.7366L26.0332 18.0041V18.0985C26.0191 18.1104 26.0047 18.1225 25.99 18.1349C25.782 18.3102 25.4997 18.5534 25.1634 18.8459C24.49 19.4314 23.5879 20.225 22.6048 21.0915C22.2897 21.3692 21.9663 21.6543 21.6393 21.9427C19.9255 23.454 18.1132 25.0522 16.885 26.113C16.4204 26.4957 15.7125 26.4957 15.2479 26.1129C13.783 24.8477 11.4555 22.8195 9.47542 21.089C8.48406 20.2226 7.58041 19.4314 6.91646 18.8486C6.5844 18.5571 6.31276 18.3182 6.12025 18.1482Z"
                    stroke="#6B7280"
                    strokeWidth="1.8"
                  />
                </svg>
                <span>{product.favoriteCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <hr className="my-10" />

      <CommentWriteForm />

      <Comments productId={productId} />
    </>
  );
}

export default Item;
