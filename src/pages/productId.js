import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetail } from '../hooks/api';

function ProductId() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // 초기 상태는 null

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDetail = await getProductDetail(productId);
        setProduct(productDetail);
      } catch (error) {
        console.error('상품 상세 정보를 불러오는 중 오류 발생:', error.message);
      }
    };
    fetchProductDetail();
  }, [productId]);

  // 비동기로 로드하는 동안 product가 null일 때 오류 방지
  if (!product) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  // 이미지가 없을 경우 대체 이미지 사용
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : '대체이미지경로';

  return (
    <div>
      <img src={imageSrc} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}원</p>
      <p>{product.description}</p>
      <p>{product.tags}</p>
      <p>{product.ownerNickname}</p>
      <p>{product.updatedAt}</p>
      <p>{product.isFavorite}</p>
    </div>
  );
}

export default ProductId;
