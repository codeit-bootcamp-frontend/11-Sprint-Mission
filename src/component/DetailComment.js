import { useState, useEffect } from "react";
import { getDetailComment } from "../api/api";
import InquiryEmpty from "../images/inquiry_empty.svg";

function DetailComment({ productId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      const productComment = await getDetailComment(productId);
      setComments(productComment);
    };
    if (productId) {
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
        <div>
          <img src={InquiryEmpty} />
          <p>아직 문의가 없어요.</p>
        </div>
      )}
    </div>
  );
}

export default DetailComment;
