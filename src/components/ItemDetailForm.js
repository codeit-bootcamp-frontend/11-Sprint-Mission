import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../api";
import favoriteIcon from "../assets/Icon.svg";
import ItemComments from "./ItemComment";
import profileIcon from "../assets/Frame 2609463.png";
import moreIcon from "../assets/Group 33735.svg";
import backIcon from "../assets/ic_back.svg";
import "./ItemDetailForm.css";

function ItemDetailForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dateOnly =
    item && item.createdAt
      ? item.createdAt.split("T")[0].replace(/-/g, ".")
      : "";

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductDetail(productId);
        setItem(data);
        setLoading(false);
      } catch (error) {
        setError("상품 정보를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleGoBack = () => {
    navigate("/items");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!item) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="item-detail">
      <div className="item-detail-container">
        <div className="item-detail-top-container">
          <div className="item-detail-top">
            <div className="item-detail-images">
              {item.images && item.images.length > 0 ? (
                item.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`상품 이미지 ${index + 1}`}
                    className="item-detail-image"
                  />
                ))
              ) : (
                <div>이미지가 없습니다.</div>
              )}
            </div>

            <div className="item-detail-info">
              <div className="item-detail-info-top">
                <div className="item-detail-title">
                  <div className="item-detail-name-container">
                    <div className="item-detail-name">{item.name}</div>
                    <img
                      src={moreIcon}
                      className="item-detail-more"
                      alt="더보기 아이콘"
                    />
                  </div>
                  <div className="item-detail-price">
                    {item.price.toLocaleString()}원
                  </div>
                </div>
                <div className="item-detail-introduce">
                  <div className="item-detail-introduce-title">상품 소개</div>
                  <p className="item-detail-description">{item.description}</p>
                </div>
              </div>

              <div className="item-detail-info-bottom">
                <div className="item-detail-tags-container">
                  <div className="item-detail-tags-title">상품 태그</div>
                  <div className="item-detail-tags">
                    {" "}
                    {item.tags && item.tags.length > 0 ? (
                      item.tags.map((tag, index) => (
                        <span key={index} className="item-detail-tag">
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <div>태그가 없습니다.</div>
                    )}
                  </div>
                </div>

                <div className="item-detail-author">
                  <div className="item-detail-author-info">
                    <img
                      src={profileIcon}
                      className="item-detail-author-image"
                      alt="프로필사진"
                    />
                    <div className="item-detail-author-end">
                      <div className="item-detail-author-nickname">
                        {item.ownerNickname}
                      </div>
                      <div className="item-detail-createdAt">{dateOnly}</div>
                    </div>
                  </div>
                  <div className="item-detail-favorite">
                    {" "}
                    <img
                      src={favoriteIcon}
                      className="item-detail-favorite-icon"
                      alt="좋아요 아이콘"
                    />
                    <div className="item-detail-favorite-count">
                      {item.favoriteCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="item-detail-bottom-container">
          <div className="item-detail-bottom">
            <div className="item-detail-comments">
              <ItemComments />
            </div>
          </div>

          <div className="item-detail-button-container">
            <button onClick={handleGoBack} className="item-detail-back-button">
              목록으로 돌아가기
              <img src={backIcon} className="back-icon" alt="뒤로가기 아이콘" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailForm;
