import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../api";
import favoriteIcon from "../assets/Icon.svg";

function ItemDetailForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dateOnly = item.createdAt.split("T")[0].replace(/-/g, ".");

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
    <div className="item-detail-container">
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
        <div className="item-detail-title">
          <div className="item-detail-name">{item.name}</div>
          <div className="item-detail-price">
            {item.price.toLocaleString()}원
          </div>
        </div>

        <div className="item-detail-introduce">상품 소개</div>
        <p className="item-detail-description">{item.description}</p>

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

        <div className="item-detail-author-info">
          <div className="item-detail-author-nickname">
            {item.ownerNickname}
          </div>
          <div className="item-detail-createdAt">{dateOnly}</div>
        </div>

        <div className="item-detail-favorite">
          {" "}
          <img src={favoriteIcon} alt="좋아요 아이콘" />
          {item.favoriteCount}
        </div>

        <div className="item-detail-comments">문의하기</div>

        <button onClick={handleGoBack} className="item-detail-back-button">
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default ItemDetailForm;
