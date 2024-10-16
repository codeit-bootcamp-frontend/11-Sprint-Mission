import React, { useState } from "react";
import "./AddItemPage.css";
import InputField from "./components/InputField";
import ImageUpload from "./components/ImageUpload";
import InputTag from "./components/InputTag";

/* 현재 추가를 해야 하는 것은 반응형디자인과 태그기능 이미지딜리트기능 태그딜리트기능 등록버튼 스테이트 */

function AddItem() {
  const [productName, setProductName] = useState("");
  const [productIntroduction, setProductIntroduction] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 방지
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <section className="submitSection">
          <h1>상품 등록하기</h1>
          <button className="submitButton">등록</button>
          {/* 아직 기능을 다 추가하지 않아서 등록버튼에 대한 스테이트를 만들지 않았습니다! */}
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

          <InputTag tags={tags} addTag={addTag} />
        </section>
      </form>
    </div>
  );
}

export default AddItem;
