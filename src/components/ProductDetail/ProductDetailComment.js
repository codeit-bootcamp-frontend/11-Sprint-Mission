import { getProductDetailComment } from '../../hooks/api';
import { useState, useEffect } from 'react';
import noInquiry from '../../assets/no-inquiry.svg';

function ProductDetailComment({ productId }) {
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
    <div className="comments">
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
        <div className="noComment">
          <img src={noInquiry} />
          <p>아직 문의가 없어요</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetailComment;
