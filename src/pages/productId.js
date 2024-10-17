import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetail, getProductDetailComment } from '../hooks/api';
import defaultImg from '../assets/img_default.svg';

function ProductId() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]); // 초기값을 빈 배열로 설정

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

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const productComment = await getProductDetailComment(productId);
        setComments(productComment);
      } catch (error) {
        console.error('댓글 정보를 불러오는 중 오류 발생', error.message);
      }
    };
    fetchComment();
  }, [productId]);

  if (!product) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : defaultImg;

  return (
    <div>
      <img src={imageSrc} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}원</p>
      <p>{product.description}</p>
      <p>{product.tags}</p>
      <p>{product.ownerNickname}</p>
      <p>{product.updatedAt}</p>
      <p>{product.isFavorite ? '좋아요' : '좋아요 없음'}</p>

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>작성자: {comment.nickname}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
}

export default ProductId;
