import Description from "components/addItem/Description";
import ImgFileInput from "components/addItem/ImgFileInput";
import PriceInput from "components/addItem/PriceInput";
import TextInput from "components/addItem/TextInput";
import TagInput from "components/addItem/TagInput";
import Header from "components/common/Header";
import PrimaryButton from "components/common/PrimaryButton";
import React, { useEffect, useReducer, useState } from "react";

const INITIAL_INPUT = {
  images: [],
  name: "",
  description: "",
  price: 0,
  tags: [],
};

const inputReducer = (state, action) => {
  const target = action.type.split("_")[1].toLowerCase();
  switch (action.type) {
    case "SET_IMAGES":
    case "SET_NAME":
    case "SET_DESCRIPTION":
    case "SET_PRICE":
    case "SET_TAGS":
      return { ...state, [target]: action.payload };
    default:
      return state;
  }
};

function AddItem() {
  const [userInput, dispatch] = useReducer(inputReducer, INITIAL_INPUT);
  const { images, name, description, price, tags } = userInput;
  const [isFormValid, setIsFormValid] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // 추후 POST API 연동 예정
      console.log(e);
    }
  };

  useEffect(() => {
    const { name, description, price, tags } = userInput;
    const isValid = name && description && price > 0 && tags.length > 0;
    setIsFormValid(isValid);
  }, [userInput]);
  return (
    <>
      <Header isLogin />
      <div className="form-wrap">
        <form onSubmit={handleSubmit}>
          <div className="title-wrap">
            <h2>상품 등록하기</h2>
            <PrimaryButton type="submit" name="btn-add" disabled={!isFormValid}>
              등록
            </PrimaryButton>
          </div>
          <ImgFileInput name="image" images={images} dispatch={dispatch}>
            상품 이미지
          </ImgFileInput>
          <TextInput
            name="name"
            value={name}
            placeholder="상품명을 입력해주세요"
            dispatch={dispatch}
          >
            상품명
          </TextInput>
          <Description
            name="description"
            value={description}
            placeholder="상품 소개를 입력해주세요"
            dispatch={dispatch}
          >
            상품 소개
          </Description>
          <PriceInput name="price" value={price} dispatch={dispatch}>
            판매가격
          </PriceInput>
          <TagInput
            name="tags"
            tags={tags}
            placeholder="태그를 입력해주세요"
            dispatch={dispatch}
          >
            태그
          </TagInput>
        </form>
      </div>
    </>
  );
}

export default AddItem;
