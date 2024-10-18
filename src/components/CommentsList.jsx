import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getCommentsById } from "../api/api";
import "../css/CommentsList.css";
import { FormatDateAgo } from "./FormatDate";

const CommentsList = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchCommentsById = async () => {
      try {
        setLoading(true);
        const result = await getCommentsById(productId, {
          limit: limit,
        });
        setComments(result.list);
        console.log(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsById();
  }, [productId, limit]);

  const handleDropdownToggle = (commentId) => {
    console.log(commentId);
    if (activeDropdown === commentId) {
      setActiveDropdown(null); // 이미 열려있는 드롭다운을 클릭하면 닫기
    } else {
      setActiveDropdown(commentId); // 클릭한 드롭다운 열기
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="comments-list">
              <div className="comments-content-box">
                <p>{comment.content}</p>
                <img
                  className="dropdown-image"
                  src="/assets/Group 33735.png"
                  alt="수정/삭제 버튼 드롭다운"
                  onClick={() => handleDropdownToggle(comment.id)}
                />
                {activeDropdown === comment.id && (
                  <div className="dropdown-menu">
                    <button className="dropdown-text">수정하기</button>
                    <button className="dropdown-text">삭제하기</button>
                  </div>
                )}
              </div>
              <div className="comments-writer-box">
                <img
                  className="writer-profile"
                  src="/assets/size=large.png"
                  alt="사용자 프로필 이미지"
                />
                <div>
                  <h3 className="writer-nickname">{comment.writer.nickname}</h3>
                  <p className="write-time">
                    {FormatDateAgo(comment.updatedAt)}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>리뷰가 없어용</p>
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
