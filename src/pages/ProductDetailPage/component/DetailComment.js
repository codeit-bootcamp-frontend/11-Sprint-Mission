import React, { useEffect, useState } from "react";
import { getProductComments } from "../../../api/api";
import { ReactComponent as InquiryEmpty } from "../../../images/inquiry_empty.svg";
import ProfileImg from "../../../images/profile.png";
import { ReactComponent as Kebab } from "../../../images/ic_kebab.svg";

function formatUpdatedAt(updatedAt) {
  const updatedDate = new Date(updatedAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now - updatedDate) / 1000);

  // 초 단위로 차이를 비교하여 적절한 포맷 반환
  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30); // 1개월은 평균 30일로 계산
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInDays / 365); // 1년은 평균 365일로 계산
  return `${diffInYears}년 전`;
}

const CommentItem = ({ item }) => {
  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.updatedAt);

  return (
    <div>
      <div className="commentContainer">
        {/* 더보기 버튼 */}
        <button className="kebobButton">
          <Kebab className="kebab" />
        </button>

        <div className="commentContent">{item.content}</div>

        <div className="userProfile">
          <img
            src={authorInfo.image || ProfileImg} // 프로필 사진 기본값 설정
            alt={`${authorInfo.nickname}님의 프로필 사진`}
            className="userProfileImage"
          />

          <div>
            <span className="username">{authorInfo.nickname}</span>
            <span className="timestamp">{formattedTimestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div>
      <InquiryEmpty />
      <p>아직 문의가 없습니다.</p>
    </div>
  );
};

function DetailComment({ productId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchComment = async () => {
      setIsLoading(true);

      try {
        const data = await getProductComments({ productId });
        setComments(data.list);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("상품의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComment();
  }, [productId]);

  // useEffect(() => {
  //   const fetchComment = async () => {
  //     const productComment = await getDetailComments(productId);
  //     setComments(productComment);
  //   };
  //   if (productId) {
  //     fetchComment();
  //   }
  // }, [productId]);

  // return (
  //   <div>
  //     <div>
  //       {comments.map((item) => (
  //         <CommentItem item={item} key={`comment-${item.id}`} />
  //       ))}
  //     </div>

  //     {comments.length > 0 ? (
  //       <ul>
  //         {comments.map((comment) => (
  //           <li key={comment.id}>
  //             <p>{comment.content}</p>
  //             <p>작성자: {comment.nickname}</p>
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <div>
  //         <img src={InquiryEmpty} />
  //         <p>아직 문의가 없어요.</p>
  //       </div>
  //     )}
  //   </div>
  // );
  if (isLoading) {
    return <div>상품 댓글 로딩중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (comments && !comments.length) {
    return <EmptyState />;
  } else {
    return (
      <div>
        {comments.map((item) => (
          <CommentItem item={item} key={`comment-${item.id}`} />
        ))}
      </div>
    );
  }
}

export default DetailComment;
