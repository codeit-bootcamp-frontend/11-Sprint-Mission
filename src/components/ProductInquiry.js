import { useState, useEffect } from "react";
import "./ProductInquiry.css";
import { getComments } from "../api/ProductAPI";
import { useParams } from "react-router-dom";

function ProductInquiry() {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(productId);
        setComments(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchComments();
  }, [productId]);

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (content.trim() !== "") {
      console.log("문의 내용:", content);
      setContent("");
    }
  };

  return (
    <div className="product-inquiry">
      <h2 className="inquiry-title">문의하기</h2>
      <textarea
        className="inquiry-input"
        value={content}
        onChange={handleInputChange}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.

"
      ></textarea>
      <button
        className={`submit-button ${content.trim() ? "active" : ""}`}
        onClick={handleSubmit}
        disabled={!content.trim()}
      >
        등록
      </button>

      <div className="inquiry-list">
        {comments.map((comment) => (
          <div key={comment.id} className="inquiry-item">
            <p className="inquiry-content">{comment.content}</p>
            <span className="inquiry-author">{comment.nickname}</span>
            <span className="inquiry-timestamp">
              {new Date(comment.updatedAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductInquiry;
