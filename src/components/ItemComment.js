import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { ReactComponent as Profile } from '../images/ic_profile.svg';

function ItemComment({ item }) {
  const [comments, setComments] = useState([]); // 댓글 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/${item.id}/comments`,
          {
            params: {
              limit: 10, // 요청에 'limit' 값을 쿼리 파라미터로 추가
            },
          },
        );
        console.log(response.data.list);
        setComments(response.data.list); // 서버에서 받은 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchComments(); // 데이터 요청
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '. ')
      .slice(0, -1); // 공백 제거
  };

  // 로딩 중일 때 보여줄 내용
  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      {comments.length > 0 ? (
        <div>
          {comments.map((comment, index) => (
            <div className="comment-container" key={index}>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-info">
                {comment.writer.image ? (
                  <img src={comment.writer.image} />
                ) : (
                  <Profile />
                )}
                <div className="comment-nickname">
                  {comment.writer.nickname}
                </div>
                <div className="comment-updatedAt">
                  {formatDate(comment.updatedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}

export default ItemComment;
