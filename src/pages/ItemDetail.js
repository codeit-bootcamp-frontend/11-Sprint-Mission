import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../style/ItemDetail.css';
import { ReactComponent as BackIcon } from '../images/ic_back.svg';
import { ReactComponent as Heart } from '../images/ic_heart.svg';
import { ReactComponent as Profile } from '../images/ic_profile.svg';

function ItemDetail() {
  const location = useLocation();
  const item = location.state.item;
  console.log(item);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/items');
  };

  return (
    <div className="item-detail-page">
      <div className="item-detail-container">
        <img className="item-image" src={item.images[0]} alt="상품 이미지" />
        <div className="item-main">
          <div className="item-info">
            <div className="item-header">
              <div className="item-title">{item.name}</div>
              <div className="item-price">{item.price}원</div>
            </div>
            <div className="item-description">
              <div className="item-description-title">상품소개</div>
              <div className="item-description-content">{item.description}</div>
            </div>
            <div className="item-tags-container">
              <div className="item-tags-title">상품 태그</div>
              <div className="item-tags-main">
                {item.tags.map((tag, index) => (
                  <div key={index} className="item-tag">
                    <div className="item-tag-value">#{tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="item-userinfo">
            <Profile />
            <div className="item-favoriteCount">
              <Heart />
              <div className="item-favoriteCount-number">
                {item.favoriteCount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="item-inquire">
        <div className="item-inquire-title">문의하기</div>
        <textarea
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.
"
        ></textarea>
        <div>등록</div>
      </div>
      <button className="back-to-list" onClick={handleBackClick}>
        목록으로 돌아가기
        <BackIcon />
      </button>
    </div>
  );
}

export default ItemDetail;
