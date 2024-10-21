import "./ItemComment.css";
import { getProductComments } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultImage from "../assets/Frame 2609463.png";
import moreIcon from "../assets/Group 33735.svg";

function ItemComments() {
  const { productId } = useParams();
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState({});

  const fetchComments = async () => {
    if (!productId) return;
    try {
      const data = await getProductComments(productId);
      setComments(data.list);
      setLoading(false);
    } catch (err) {
      setError("댓글을 불러오는 데 실패했습니다.");
      setLoading(false);
    }
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);
    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

    return `${diffInDays}일 전`;
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMoreClick = (commentId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  if (loading) return <div>댓글을 불러오는 중입니다...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="item-inquiry">
      <div className="item-inquiry-title">문의하기</div>
      <textarea
        className="item-inquiry-input"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="item-inquiry-button-container">
        <button className="item-inquiry-button" disabled={!inputValue}>
          등록
        </button>
      </div>

      <div className="item-comments-section">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="comment-content-container">
                <div className="comment-content">{comment.content}</div>
                <div className="comment-content-more">
                  <img
                    src={moreIcon}
                    className="item-detail-more"
                    alt="더보기 아이콘"
                    onClick={() => handleMoreClick(comment.id)}
                  />
                  {showMore[comment.id] && (
                    <div className="comment-actions">
                      <button className="comment-edit-button">수정하기</button>
                      <button className="comment-delete-button">
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="comment-author-info">
                <img
                  src={comment.writer.image || defaultImage}
                  alt="작성자 이미지"
                  className="comment-author-image"
                />
                <div className="comment-author-details">
                  <div className="comment-author-nickname">
                    {comment.writer.nickname}{" "}
                  </div>
                  <div className="comment-updated-at">
                    {timeAgo(comment.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default ItemComments;
