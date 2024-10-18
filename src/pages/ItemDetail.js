import { useLocation, Link } from 'react-router-dom';

function ItemDetail() {
  const location = useLocation();
  const item = location.state.item;

  return (
    <div>
      <div className="item-detail-container">
        <img className="item-image" src={item.images[0]} alt="상품 이미지" />
        <div className="item-info">
          <div>{item.name}</div>
          <div>{item.favoriteCount}</div>
          <div>{item.tags}</div>
          <div>{item.description}</div>
        </div>
      </div>
      <div>
        문의하기
        <textarea
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.
"
        ></textarea>
        <div>등록</div>
      </div>
      <Link to={'/items'}>목록으로 돌아가기</Link>
    </div>
  );
}

export default ItemDetail;
