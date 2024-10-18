import React, { useState, useEffect } from "react";
import "./AddItemPage.css";
import InputField from "./components/InputField";
import ImageUpload from "./components/ImageUpload";
import InputTag from "./components/InputTag";

/* 추가해야 할 것: 반응형 디자인 검토 */

function AddItem() {
  const [productName, setProductName] = useState("");
  const [productIntroduction, setProductIntroduction] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const deleteTag = (deleteTag) => {
    setTags(tags.filter((tag) => tag !== deleteTag));
  };

  const handleSubmit = (e) => {
    // 임시 제출 기능
    e.preventDefault();
  };

  useEffect(() => {
    setIsFormValid(
      /* input에 모든 값을 입력하래서 일단 글자수가 0이 이상이면 
      적용되도록 했는데 보통 조건을 어떻게 걸어야 하나요?

      useEffect말고 const변수로 조건부 렌더링을 하려고 하니 렌더링이 한 번 바뀌면
      이후 input 값을 지워도 다시 변경이 안 돼서
      useEffect를 사용했는데 옳은 방법일까요?
      */
      productName && productIntroduction && productPrice && tags.length > 0
    );
  }, [productName, productIntroduction, productPrice, tags]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <section className="submitSection">
          <h1>상품 등록하기</h1>
          <button
            className="submitButton"
            style={{
              backgroundColor: isFormValid ? "#3692FF" : "#9ca3af",
            }}
          >
            등록
          </button>
        </section>
        <section className="inputSection">
          <ImageUpload title="상품 이미지" />

          <InputField
            id="name"
            label="상품명"
            type="text"
            placeholder="상품명을 입력해주세요"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <InputField
            id="introduction"
            label="상품 소개"
            type="textarea"
            placeholder="상품 소개를 입력해주세요"
            value={productIntroduction}
            onChange={(e) => setProductIntroduction(e.target.value)}
          />

          <InputField
            id="price"
            label="판매가격"
            type="text"
            placeholder="판매 가격을 입력해주세요"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <InputTag tags={tags} addTag={addTag} deleteTag={deleteTag} />
        </section>
      </form>
    </div>
  );
}

export default AddItem;
