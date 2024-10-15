import React, { useState } from "react";
import "./AddItemPage.css";
import InputField from "./components/InputField";

function AddItem() {
  const [productName, setProductName] = useState("");
  const [productIntroduction, setProductIntroduction] = useState("");
  const [productPrice, setProductPrice] = useState("");

  return (
    <div className="container">
      <form>
        <section className="submitSection">
          <h1>상품 등록하기</h1>
          <button className="submitButton">등록</button>
        </section>
        <section className="inputSection">
          {/* 이미지는 아직 미구현 */}

          <InputField
            label="상품명"
            type="text"
            placeholder="상품명을 입력해주세요"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <InputField
            label="상품 소개"
            type="textarea"
            placeholder="상품 소개를 입력해주세요"
            value={productIntroduction}
            onChange={(e) => setProductIntroduction(e.target.value)}
          />

          <InputField
            label="판매가격"
            type="text"
            placeholder="판매 가격을 입력해주세요"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          {/* 태그는 아직 미구현 */}
        </section>
      </form>
    </div>
  );
}

export default AddItem;
