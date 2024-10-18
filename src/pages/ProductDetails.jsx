import { useState } from "react";
import HeartCountArea from "../components/common/HeartCountArea";
import Images from "../components/common/Images";
import TagsList from "../components/common/TagsList";
import DropDownMenu from "../components/common/DropDownMenu";
import Button from "../components/common/Button";
import INQUIRY_IMAGE from "../assets/Img_inquiry_empty.svg";
import styled from "./ProductDetails.module.scss";
import UserInfo from "../components/common/UserInfo";

function ProductDetails() {
  const handleEditClick = () => console.log("수정하기 버튼 클릭");
  const handleDeleteClick = () => console.log("삭제하기 버튼 클릭");

  const [formValues, setFormValues] = useState("");

  const isFormValid = formValues.trim() !== "";

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormValues(value);
  };

  return (
    <main className="page-productDetails">
      <div className="container">
        <dir className={styled["product-detail-container"]}>
          <Images
            imageSize={{
              pcSize: "big",
              tabletSize: "big-large",
              mobileSize: "big-large",
            }}
            classNames="product-detail-images"
            src="http://placehold.it/600x600"
            alt="상품 이미지"
          />
          <div className={styled["product-detail-info"]}>
            <div className={styled["product-title"]}>
              <h2>아이패드 미니 팔아요</h2>
              <p className={styled["price"]}>500,000원</p>
            </div>
            <div className={styled["product-desc"]}>
              <h3>상품 소개</h3>
              <p>
                액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면 전혀
                신경쓰이지않을정도입니다. 박스 보관중입니다. 메모용과
                넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을
                못느꼈네요 잘 안써서 싸게넘깁니다! 택배거래안합니다.
              </p>
            </div>
            <div className={styled["product-tag"]}>
              <h3>상품 태그</h3>
              <TagsList
                tags={["아이패드미니", "애플", "가성비"]}
                remove={false}
              />
            </div>
            <div className={styled["user-info"]}>
              <UserInfo size="big" sort="column" />
              <HeartCountArea
                count="123"
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
        </dir>
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
