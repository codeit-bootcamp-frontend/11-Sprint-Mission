import { getComments, Comment } from '../../hooks/api'; // API에서 제공하는 Comment 타입 사용
import React, { useState, useEffect } from 'react';
import noInquiry from '../../assets/no-inquiry.svg';

interface ProductDetailCommentProps {
  productId: number;
}

function ProductDetailComment({ productId }: ProductDetailCommentProps) {
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 댓글 데이터 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(productId); // API 호출
        setComments(data.list); // 응답 데이터에서 댓글 목록 설정
      } catch (error: any) {
        console.error('댓글 정보를 불러오는 중 오류 발생:', error.message);
        setError('댓글 정보를 불러오는 데 실패했습니다.'); // 에러 메시지 설정
      }
    };

    if (productId) {
      fetchComments();
    }
  }, [productId]);

  return (
    <div className="comments">
      {error ? ( // 에러 발생 시 메시지 표시
        <div className="error">
          <p>{error}</p>
        </div>
      ) : comments.length > 0 ? ( // 댓글이 있을 경우
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>작성자: {comment.writer.nickname}</p>
            </li>
          ))}
        </ul>
      ) : (
        // 댓글이 없을 경우
        <div className="noComment">
          <img src={noInquiry} alt="No Inquiry" />
          <p>아직 문의가 없어요</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetailComment;
