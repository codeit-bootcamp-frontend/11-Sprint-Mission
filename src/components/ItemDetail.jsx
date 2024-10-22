import "./ItemDetail.css";
import { useEffect, useState } from "react";

import { getItemById } from "../util/api";
import Tag from "../components/Button/Tag";
import UserInfo from "../components/UserInfo";
import Default from "../assets/default.svg";
import Kebab from "../assets/icons/ic_kebab.svg";
import Heart from "../assets/icons/ic_heart.svg";

import { formatDate } from "../util/formatDate";

function ItemDetail({ id }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    let result;
    const fetchItem = async () => {
      try {
        result = await getItemById({ id });
        console.log(result);
        setItem(result);
      } catch (e) {
        console.log(e);
        return;
      }
    };
    fetchItem();
  }, []);

  if (!item) {
    return <div>Loading...</div>; // item이 아직 없으면 로딩 중 표시
  }

  return (
    <div className="ItemDetail">
      <div className="ItemDetail__container">
        <div className="ItemDetail__wrapper">
          <img
            className="ItemDetail__Img"
            src={item.images ? item.images[0] : Default}
            alt="detail_img"
            onError={(e) => {
              e.target.src = Default; // 이미지 로드 실패 시 Default 이미지로 변경
            }}
          />
        </div>

        <section className="ItemDetail__textSection">
          <div className="ItemDetail__header">
            <div className="ItemDetail__name__container">
              <h4 className="ItemDetail__name">{item.name}</h4>
              <img src={Kebab} alt="kebab" />
            </div>
            <h2 className="ItemDetail__price">
              {item.price.toLocaleString("ko-KR")}
            </h2>
          </div>

          <div className="ItemDetail__body">
            <div className="ItemDetail__bodyContainer">
              <label className="ItemDetail__label">상품 소개</label>
              <p className="ItemDetail__description">{item.description}</p>
            </div>
            <div className="ItemDetail__bodyContainer">
              <label className="ItemDetail__label">상품 태그</label>
              <div className="ItemDetail__tag">
                {item.tags.map((item, index) => (
                  <Tag key={index} text={item} hasDeleteBtn={false} />
                ))}
              </div>
            </div>
          </div>

          <div className="ItemDetail__bottom">
            <UserInfo
              nickname={item.ownerNickname}
              time={formatDate(item.createdAt)}
            />
            <div className="ItemDetail__border">
              <div className="ItemDetail__heartContainer">
                <img src={Heart} alt="heart" className="ItemDetail__heartImg" />
                <p className="ItemDetail__favoriteCount">
                  {item.favoriteCount}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ItemDetail;
