import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductsDetail,
  getProductsDetailComments,
} from "../services/products-api";
import useAsyncRequest from "../hooks/useAsyncRequest";

import HeartCountArea from "../components/common/HeartCountArea";
import Images from "../components/common/Images";
import TagsList from "../components/common/TagsList";
import DropDownMenu from "../components/common/DropDownMenu";
import Button from "../components/common/Button";
import UserInfo from "../components/common/UserInfo";

import INQUIRY_IMAGE from "../assets/Img_inquiry_empty.svg";
import RETURN_IMAGE from "../assets/ic_back.svg";
import styled from "./ProductDetails.module.scss";

function ProductDetails() {
  const [details, setDetails] = useState({});
  const [commentsList, setCommentsList] = useState({});
  const { execute, isLoading, error: fetchError } = useAsyncRequest();
  const { productId } = useParams();
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    const handleProductsLoad = async () => {
      const result = await execute(() => getProductsDetail(productId));
      if (result) {
        setDetails(result);
      }
    };

    const handleCommentsListLoad = async () => {
      const result = await execute(() => getProductsDetailComments(productId));
      const { list } = result;
      if (result) {
        setCommentsList(list);
      }
    };

    handleProductsLoad();
    handleCommentsListLoad();
  }, [productId, execute]);

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

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleEditSubmit = (item, updatedContent) => {
    if (updatedContent.trim() !== "") {
      setCommentsList((prevItems) =>
        prevItems.map((comment) =>
          comment.id === item.id
            ? { ...comment, content: updatedContent }
            : comment
        )
      );
      setEditingCommentId(null);
    }
  };

  const handleDeleteClick = (itemToDeleteId) => {
    setCommentsList((prevItems) =>
      prevItems.filter((item) => item.id !== itemToDeleteId)
    );
  };

  function CommitEditForm({ item, onCancel, onSubmit }) {
    const [editValue, setEditValue] = useState(item.content);
    const isEditValid = editValue.trim() !== "";

    const handleEditInput = (e) => {
      const value = e.target.value;
      setEditValue(value);
    };

    return (
      <form className={styled.userEditForm}>
        <textarea
          className={`default ${styled["inquiry-edit-input"]}`}
          value={editValue}
          name="inquiry"
          onChange={handleEditInput}
        />
        <div className={styled.userEditWrap}>
          <UserInfo
            size="small"
            sort="column"
            name={item.writer.nickname}
            createdDate={formatRegistrationDate(item.createdAt)}
          />
          <div className={`btn-wrap ${styled.btnWrap}`}>
            <Button
              link={false}
              className="cancel"
              styleType={`square small_40 not`}
              onClick={onCancel}>
              취소
            </Button>
            <Button
              link={false}
              className="post"
              styleType={`square small_40 ${!isEditValid ? "gray" : "blue"}`}
              disabled={!isEditValid && Object.values(editValue).length > 0}
              onClick={() => onSubmit(editValue)}>
              수정 완료
            </Button>
          </div>
        </div>
      </form>
    );
  }

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
                styles="large border"
                className={styled["btn-heart"]}
              />
            </div>
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
          </div>
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
        {commentsList.length > 0 ? (
          <ul className={styled["inquiry-list"]}>
            {commentsList.map((item) => (
              <li key={item.id} className={styled["inquiry-item"]}>
                {editingCommentId === item.id ? (
                  <CommitEditForm
                    item={item}
                    onCancel={handleCancelEdit}
                    onSubmit={(updatedContent) =>
                      handleEditSubmit(item, updatedContent)
                    }
                  />
                ) : (
                  <>
                    <p className={styled.comment}>{item.content}</p>
                    <UserInfo
                      size="small"
                      sort="column"
                      name={item.writer.nickname}
                      createdDate={formatRegistrationDate(item.createdAt)}
                    />
                    <DropDownMenu classNames={styled["dropdown"]}>
                      <DropDownMenu.Item
                        onClick={() => handleEditClick(item.id)}
                        className="btn-remove">
                        수정하기
                      </DropDownMenu.Item>
                      <DropDownMenu.Item
                        onClick={() => handleDeleteClick(item.id)}
                        className="btn-delete">
                        삭제하기
                      </DropDownMenu.Item>
                    </DropDownMenu>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styled["inquiry-list-not"]}>
            <img src={INQUIRY_IMAGE} alt="문의 없을때 판다 이미지" />
            <p>아직 문의가 없어요</p>
          </div>
        )}
        <div className={styled["btn-wrap"]}>
          <Button
            link={true}
            href={"/items"}
            className="return"
            styleType="round blue medium">
            목록으로 돌아가기
            <img src={RETURN_IMAGE} alt="" />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
