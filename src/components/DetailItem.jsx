import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // 추가
import { getProductsById } from "../api/api";
import CommentsList from "./CommentsList";
import "../css/DetailItem.css";
import { FormatDate } from "./FormatDate";

const DetailItem = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsById = async () => {
      try {
        setLoading(true);
        const result = await getProductsById(productId);
        setProduct(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsById();
  }, [productId]);

  const handleChange = (e) => {
    const nextValue = e.target.value;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {product ? (
        <div className="detailItem-container">
          <section className="detailItem-box">
            <div className="deatilItem-image-box">
              <img
                className="deatilItem-image"
                src={product.images[0]}
                alt={product.name}
              />
            </div>
            <div className="detailItem-content-box">
              <div className="detailItem-header-content">
                <div className="detailItem-header">
                  <h1 className="detailItem-name">{product.name}</h1>
                  <img
                    className="detailItem-menu"
                    src="/assets/Group 33735.png"
                    alt="메뉴 더보기 버튼"
                  />
                </div>
                <p className="detailItem-price">{product.price}원</p>
              </div>
              <p className="deatilItem-introduce">상품 소개</p>
              <p className="detailItem-description">{product.description}</p>
              <p className="deatilItem-introduce">상품 태그</p>
              <div className="detailItem-tag-container">
                {product.tags.map((tag, index) => (
                  <div key={index} className="detailItem-tag-box">
                    #{tag}
                  </div>
                ))}
              </div>
              <div className="user-container">
                <div className="user-box">
                  <img
                    className="user-profile"
                    src="/assets/size=large.png"
                    alt="사용자 프로필 이미지"
                  />
                  <div>
                    <p className="user-nickname">{product.ownerNickname}</p>
                    <p className="created-time">
                      {FormatDate(product.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="favoriteCount-container">
                  <div className="favoriteCount-box">
                    <img
                      className="favoriteCount-image"
                      src="/assets/Icon (2).png"
                      alt="좋아요 하트 모양"
                    />
                    <p className="favoriteCount">{product.favoriteCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="question-container">
            <p className="question-header">문의하기</p>
            <form>
              <label htmlFor="question-input"></label>
              <textarea
                placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                id="question-input"
                type="text"
                name="question"
                onChange={handleChange}
              ></textarea>
              <div className="button-box">
                <button className="question-register-button">등록</button>
              </div>
            </form>
          </section>
          <CommentsList />
          <Link to="/items" className="back-button-link">
            <button className="back-button">
              <p className="back-button-text">목록으로 돌아가기</p>
              <img
                className="button-arrow"
                src="/assets/Group 33736.png"
                alt="돌아가는 화살표"
              ></img>
            </button>
          </Link>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </>
  );
};

export default DetailItem;
