import { useLocation, useNavigate } from 'react-router-dom';
import '../style/ItemDetail.css';
import BackIcon from '@public/svgs/ic_back.svg';
import Heart from '@public/svgs/ic_heart.svg';
import Profile from '@public/svgs/ic_profile.svg';
import { useState, useEffect, ChangeEvent } from 'react';
import ItemComment from '@components/ItemComment';
import axiosInstance from '@lib/axiosInstance';

const INITIAL_VALUES = {
  tags: [],
  images: '',
  name: '',
  price: 0,
  description: '',
  ownerNickname: '',
  updatedAt: '',
  favoriteCount: 0,
};

function ItemDetail({ initialValues = INITIAL_VALUES }) {
  const location = useLocation();
  const item = location.state.item;
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [contentValue, setContentValue] = useState('');
  const [itemDetail, setItemDetail] = useState(initialValues);

  const fetchItemDetail = async () => {
    try {
      const response = await axiosInstance.get(`/products/${item.id}`, {
        params: {
          limit: 10, // 요청에 'limit' 값을 쿼리 파라미터로 추가
        },
      });
      setItemDetail(response.data); // 서버에서 받은 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const handleBackClick = () => {
    navigate('/items');
  };

  const formatDate = (isoDate: string) => {
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

  useEffect(() => {
    fetchItemDetail();
    const isValid = contentValue.length > 0;
    setIsFormValid(isValid);
  }, [contentValue]);

  return (
    <div className="item-detail-page">
      <div className="item-detail-container">
        <img className="item-image" src={itemDetail.images} alt="상품 이미지" />
        <div className="item-main">
          <div className="item-info">
            <div className="item-header">
              <div className="item-title">{itemDetail.name}</div>
              <div className="item-price">{itemDetail.price}원</div>
            </div>
            <div className="item-description">
              <div className="item-description-title">상품소개</div>
              <div className="item-description-content">
                {itemDetail.description}
              </div>
            </div>
            <div className="item-tags-container">
              <div className="item-tags-title">상품 태그</div>
              <div className="item-tags-main">
                {itemDetail.tags.map((tag, index) => (
                  <div key={index} className="item-tag">
                    <div className="item-tag-value">#{tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="item-user">
            <div className="item-user-info">
              <Profile className="item-user-image" />
              <div className="item-user-content">
                <div className="item-nickname">{itemDetail.ownerNickname}</div>
                <div className="item-updatedAt">
                  {formatDate(itemDetail.updatedAt)}
                </div>
              </div>
            </div>
            <div className="item-favoriteCount">
              <Heart />
              <div className="item-favoriteCount-number">
                {itemDetail.favoriteCount}
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
          rows={3}
          value={contentValue}
          onChange={handleChange}
        ></textarea>
        <button
          className={`inquire-Registerbtn ${isFormValid ? 'active' : ''}`}
          disabled={!isFormValid}
        >
          등록
        </button>
        <ItemComment item={item} />
      </div>
      <button className="back-to-list" onClick={handleBackClick}>
        목록으로 돌아가기
        <BackIcon />
      </button>
    </div>
  );
}

export default ItemDetail;
