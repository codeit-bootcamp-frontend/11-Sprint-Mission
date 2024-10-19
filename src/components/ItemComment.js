import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { ReactComponent as Profile } from '../images/ic_profile.svg';
import { ReactComponent as Dropdown } from '../images/ic_kebab.svg';
import { ReactComponent as EmptyComment } from '../images/Img_inquiry_empty.svg';
import '../style/ItemComment.css';

function ItemComment({ item }) {
  const [comments, setComments] = useState([]); // 댓글 데이터를 저장할 상태

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

  return (
    <div>
      {comments.length > 0 ? (
        <div>
          {comments.map((comment, index) => (
            <div className="comment-container" key={index}>
              <div className="comment-header">
                <div className="comment-content">{comment.content}</div>
                <Dropdown />
              </div>
              <div className="comment-info">
                {comment.writer.image ? (
                  <img className="profile-icon" src={comment.writer.image} />
                ) : (
                  <Profile className="profile-icon" />
                )}
                <div className="comment-user-info">
                  <div className="comment-nickname">
                    {comment.writer.nickname}
                  </div>
                  <div className="comment-updatedAt">
                    {formatDate(comment.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="comment-empty">
          <EmptyComment className="comment-empty-icon" />
          <div className="comment-empty-content">아직 문의가 없어요</div>
        </div>
      )}
    </div>
  );
}

export default ItemComment;
