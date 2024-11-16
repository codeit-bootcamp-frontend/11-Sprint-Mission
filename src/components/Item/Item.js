import "./Item.css";
import ic_heart from "../../assets/images/ic_heart.svg";
import thumbDefault from "../../assets/images/thumbnail-placeholder.png";
import { Link } from "react-router-dom";

/**
 * 상품 요소 컴포넌트
 * @param {Object} item 상품 정보가 담긴 객체
 * @param {String} type 삼품 타입 null(기본) best(베스트 상품)
 * @returns 상품 카드 요소
 * @todo item.images[0]가 이상한 url이면 요청에 실패해 엑박이 뜸
 * @todo classnames 모듈 적용하기
 */
function Item({ item, type = null }) {
  const classNames = `Item ${type ? type : ""}`;

  const handleErrorLoadingImg = (e) => {
    e.target.src = thumbDefault;
  };

  return (
    <Link to={`/items/${item.id}`}>
      <div className={classNames}>
        <img
          className="thumbnail"
          src={item.images[0] ?? thumbDefault}
          alt={item.name}
          onError={handleErrorLoadingImg}
        />
        <div className="Item-content">
          <h4 className="name">{item.name}</h4>
          <div className="price">{`${item.price}원`}</div>
          <div className="favorite">
            <img src={ic_heart} alt="좋아요" />
            <div>{item.favoriteCount}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Item;
