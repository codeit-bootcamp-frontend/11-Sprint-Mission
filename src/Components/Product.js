import { Link } from 'react-router-dom';
import Img from './Img';
import iconHeart from '../assets/icon-heart.svg';
import styles from './Product.module.css';

/**
 * 상품 목록에 상품 컴포넌트
 * @param {number} id : 상품 아이디
 * @param {string} image : 상품 이미지
 * @param {string} name : 상품 이름
 * @param {number} price : 상품 가격
 * @param {number} favoriteCount : 좋아요 갯수
 * @return {JSX}
 */
function Product({ id, image, name, price = 0, favoriteCount = 0 }) {
  return (
    <div className={styles.product}>
      <Link to={`/items/${id}`} className={styles.wrap}>
        <Img src={image} alt={name} />
      </Link>

      <h3 className={styles.title}>
        <Link to={`/items/${id}`}>{name}</Link>
      </h3>

      <div className={styles.price}>{price.toLocaleString()}원</div>

      <div className={styles.favorite}>
        <img src={iconHeart} alt="" />
        {favoriteCount}
      </div>
    </div>
  );
}

export default Product;
