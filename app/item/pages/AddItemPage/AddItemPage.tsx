import React, { useState, useEffect, FormEvent } from "react";
import "./AddItemPage.css";
import InputField from "./components/InputField";
import ImageUpload from "./components/ImageUpload";
import InputTag from "./components/InputTag";

function AddItem() {
  const [productName, setProductName] = useState<string>("");
  const [productIntroduction, setProductIntroduction] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const addTag = (newTag: string) => {
    setTags([...tags, newTag]);
  };

  const deleteTag = (deleteTag: string) => {
    setTags(tags.filter((tag) => tag !== deleteTag));
  };

  const handleSubmit = (e: FormEvent) => {
    // 임시 제출 기능
    e.preventDefault();
  };

  useEffect(() => {
    setIsFormValid(
      Boolean(
        productName && productIntroduction && productPrice && tags.length > 0
      )
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
