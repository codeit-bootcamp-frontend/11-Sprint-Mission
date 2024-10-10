import Description from "components/addItem/Description";
import ImgFileInput from "components/addItem/ImgFileInput";
import PriceInput from "components/addItem/PriceInput";
import TextInput from "components/addItem/TextInput";
import Header from "components/common/Header";
import PrimaryButton from "components/common/PrimaryButton";
import React, { useState } from "react";

const INITIAL_INPUT = {
  imgUrl: "",
  title: "",
  description: "",
  price: "",
  tag: "",
};

function AddItem() {
  const [userInput, setUserInput] = useState(INITIAL_INPUT);
  const { imgUrl, title, description, price, tag } = userInput;
  const handleSubmit = (e) => {
    // e.preventDefault();
    // console.log(e);
  };
  return (
    <>
      <Header isLogin />
      <div>{imgUrl}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{tag}</div>
      <div className="form-wrap">
        <form onSubmit={handleSubmit}>
          <div className="title-wrap">
            <h2>상품 등록하기</h2>
            <PrimaryButton type="submit" name="btn-add">
              등록
            </PrimaryButton>
          </div>
          <ImgFileInput name="image" setImage={setUserInput}>
            상품 이미지
          </ImgFileInput>
          <TextInput
            name="title"
            value={title}
            placeholder="상품명을 입력해주세요"
            setUserInput={setUserInput}
          >
            상품명
          </TextInput>
          <Description
            name="description"
            value={description}
            placeholder="상품 소개를 입력해주세요"
            setUserInput={setUserInput}
          >
            상품 소개
          </Description>
          <PriceInput name="price" value={price} setUserInput={setUserInput}>
            판매가격
          </PriceInput>
          <TextInput
            name="tag"
            value={tag}
            placeholder="태그를 입력해주세요"
            setUserInput={setUserInput}
          >
            태그
          </TextInput>
        </form>
      </div>
    </>
  );
}

export default AddItem;
