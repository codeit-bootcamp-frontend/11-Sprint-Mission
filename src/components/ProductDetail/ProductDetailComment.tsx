import { getProductDetailComment } from '../../hooks/api';
import React, { useState, useEffect } from 'react';
import noInquiry from '../../assets/no-inquiry.svg';

interface Comment {
  id: number;
  content: string;
  nickname: string;
}

// 컴포넌트 props 타입 정의
interface ProductDetailCommentProps {
  productId: number;
}

function ProductDetailComment({ productId }: ProductDetailCommentProps) {
  const [comments, setComments] = useState<Comment[]>([]); // 상태에 타입 명시

  // 상품 댓글 불러오기
  useEffect(() => {
    const fetchComment = async () => {
      try {
        // API의 반환 타입을 명확히 지정
        const productComment: any = await getProductDetailComment(productId);
        setComments(productComment);
      } catch (error: any) {
        console.error('댓글 정보를 불러오는 중 오류 발생', error.message);
      }
    };

    if (productId) {
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
          <img src={noInquiry} alt="No Inquiry" />
          <p>아직 문의가 없어요</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetailComment;
