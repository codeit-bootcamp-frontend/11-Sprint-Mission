import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsDetail } from "../services/products-api";
import useAsyncRequest from "../hooks/useAsyncRequest";

import HeartCountArea from "../components/common/HeartCountArea";
import Images from "../components/common/Images";
import TagsList from "../components/common/TagsList";
import DropDownMenu from "../components/common/DropDownMenu";
import Button from "../components/common/Button";
import UserInfo from "../components/common/UserInfo";

import INQUIRY_IMAGE from "../assets/Img_inquiry_empty.svg";
import styled from "./ProductDetails.module.scss";

function ProductDetails() {
  const [details, setDetails] = useState({});
  const { execute, isLoading, error: fetchError } = useAsyncRequest();
  const { productId } = useParams();

  useEffect(() => {
    const handleLoad = async () => {
      const result = await execute(() => getProductsDetail(productId));
      if (result) {
        setDetails(result);
      }
    };

    handleLoad();
  }, [productId]);

  const handleEditClick = () => console.log("수정하기 버튼 클릭");
  const handleDeleteClick = () => console.log("삭제하기 버튼 클릭");

  const [formValues, setFormValues] = useState("");

  const isFormValid = formValues.trim() !== "";

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormValues(value);
  };

  if (isLoading) {
    return <p>로딩 중 입니다...</p>;
  }

  if (fetchError) {
    return <p>오류 발생: {fetchError.message}</p>;
  }

  if (!Object.keys(details).length) {
    return <p>상품 정보를 불러올 수 없습니다.</p>;
  }

  const priceReplace = details.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 날짜 변환 함수
  const formatRegistrationDate = (isDate) => {
    const registrationDate = new Date(isDate);
    const currentDate = new Date();
    const timeDifference = currentDate - registrationDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      const roundedHours = Math.floor(hoursDifference);
      return roundedHours < 1 ? "방금 전" : `${roundedHours}시간 전`;
    } else {
      const year = registrationDate.getFullYear();
      const month = String(registrationDate.getMonth() + 1).padStart(2, "0");
      const day = String(registrationDate.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    }
  };

  return (
    <main className="page-productDetails">
      <div className="container">
        <div className={styled["product-detail-container"]}>
          <Images
            imageSize={{
              pcSize: "big",
              tabletSize: "big-large",
              mobileSize: "big-large",
            }}
            classNames="product-detail-images"
            src={details.images}
            alt={`${details.name} 이미지`}
          />
          <div className={styled["product-detail-info"]}>
            <div className={styled["product-title"]}>
              <h2>{details.name}</h2>
              <p className={styled["price"]}>{priceReplace}원</p>
            </div>
            <div className={styled["product-desc"]}>
              <h3>상품 소개</h3>
              <p>{details.description}</p>
            </div>
            <div className={styled["product-tag"]}>
              <h3>상품 태그</h3>
              <TagsList tags={details.tags} remove={false} />
            </div>
            <div className={styled["user-info"]}>
              <UserInfo
                size="big"
                sort="column"
                name={details.ownerNickname}
                createdDate={formatRegistrationDate(details.createdAt)}
              />
              <HeartCountArea
                count={details.favoriteCount}
                style="large border"
                className={styled["btn-heart"]}
              />
            </div>
          </div>
          <DropDownMenu classNames={styled["dropdown"]}>
            <DropDownMenu.Item onClick={handleEditClick} className="btn-remove">
              수정하기
            </DropDownMenu.Item>
            <DropDownMenu.Item
              onClick={handleDeleteClick}
              className="btn-delete">
              삭제하기
            </DropDownMenu.Item>
          </DropDownMenu>
        </div>
        <div className={styled["inquiry-form"]}>
          <h4>문의하기</h4>
          <form>
            <textarea
              className={`default ${styled["inquiry-input"]}`}
              value={formValues}
              name="inquiry"
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              onChange={handleInputChange}
            />
            <Button
              link={false}
              className="post"
              styleType={`square small_40 ${!isFormValid ? "gray" : "blue"}`}
              disabled={!isFormValid && Object.values(formValues).length > 0}>
              등록
            </Button>
          </form>
        </div>
        <ul className={styled["inquiry-list"]}>
          <li className={styled["inquiry-item"]}>
            <p className={styled["comment"]}>
              혹시 사용기간이 어떻게 되실까요?
            </p>
            <UserInfo size="small" sort="column" />
            <DropDownMenu classNames={styled["dropdown"]}>
              <DropDownMenu.Item
                onClick={handleEditClick}
                className="btn-remove">
                수정하기
              </DropDownMenu.Item>
              <DropDownMenu.Item
                onClick={handleDeleteClick}
                className="btn-delete">
                삭제하기
              </DropDownMenu.Item>
            </DropDownMenu>
          </li>
          <li className={styled["inquiry-item"]}>
            <p className={styled["comment"]}>
              혹시 사용기간이 어떻게 되실까요?
            </p>
            <UserInfo size="small" sort="column" />
            <DropDownMenu classNames={styled["dropdown"]}>
              <DropDownMenu.Item
                onClick={handleEditClick}
                className="btn-remove">
                수정하기
              </DropDownMenu.Item>
              <DropDownMenu.Item
                onClick={handleDeleteClick}
                className="btn-delete">
                삭제하기
              </DropDownMenu.Item>
            </DropDownMenu>
          </li>
        </ul>
        <div className={styled["inquiry-list-not"]}>
          <img src={INQUIRY_IMAGE} alt="문의 없을때 판다 이미지" />
          <p>아직 문의가 없어요</p>
        </div>
        <div className={styled["btn-wrap"]}>
          <Button
            link={true}
            href={"/items"}
            className="return"
            styleType="round blue medium">
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
