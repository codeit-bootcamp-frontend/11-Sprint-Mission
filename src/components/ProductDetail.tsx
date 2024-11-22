import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../api/ProductAPI';
import { Product } from '../types/Product';
import './ProductDetail.css';
import UserProfile from './UserProfile';
import heartImg from '../image/heart-img.png';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const productIdNumber = Number(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(productIdNumber);
        setProduct(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    fetchProduct();
  }, [productIdNumber]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="item-detail">
      <div className="item-images">
        {product.images && product.images.length > 0 ? (
          product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className="product-image"
            />
          ))
        ) : (
          <div className="product-image-placeholder">이미지가 없습니다</div>
        )}
      </div>

      <div className="item-info">
        <div className="product-header">
          <h1 className="product-name">{product.name}</h1>
          <h1 className="product-price">{product.price.toLocaleString()}원</h1>
        </div>

        <div className="divider"></div>

        <div className="product-content">
          <h1>상품 소개</h1>
          <p className="product-description">{product.description}</p>
        </div>
        <div className="product-tags">
          <h1>상품 태그</h1>
          {product.tags.map((tag, index) => (
            <span className="product-tag" key={index}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="post-info">
          <UserProfile
            nickname={product.ownerNickname}
            timestamp={new Date(product.createdAt).toLocaleDateString()}
          />
          <div className="post-favorite">
            <img className="favorite-icon" src={heartImg} alt="좋아요" />
            {product.favoriteCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
