import { getProductDetailComment } from '../../hooks/api';
import { useState, useEffect } from 'react';

function ProductDetailComment({ productId }) {
  // productId를 props로 받는다고 가정
  const [comments, setComments] = useState([]); // 상품 댓글

  // 상품 댓글 불러오기
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const productComment = await getProductDetailComment(productId); // productId를 사용하여 API 호출
        setComments(productComment); // 댓글 설정
      } catch (error) {
        console.error('댓글 정보를 불러오는 중 오류 발생', error.message);
      }
    };

    if (productId) {
      // productId가 있을 때만 API 호출
      fetchComment();
    }
  }, [productId]);

  return (
    <div>
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

export default ProductDetailComment;
