import React, { useState } from "react";
import "./AddItemPage.css";
import Input from "../components/common/Input";
import FileInput from "../components/common/FileInput";
import icPlus from "../images/icon/ic_plus.svg";
import Category from "../components/common/Category";
import Textarea from "../components/common/TextArea";

const INITIAL_DATA = {
  productName: "",
  productInt: "",
  productPrice: "",
  productTag: "",
  fileInput: null,
};

const categoryData = ["티셔츠", "티셔츠"];

const AddItemPage = () => {
  const [productData, setProductData] = useState(INITIAL_DATA);

  const handleChange = (name, value) => {
    setProductData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const isButtonDisabled = Object.values(productData).some(
    (value) => value === ""
  );

  return (
    <div className="main-content-additem">
      <div className="product-top">
        <h1 className="product-name">상품 등록하기</h1>
        <button
          className={`btn ${isButtonDisabled ? "btn-gray" : "btn-primary"}`}
          disabled={isButtonDisabled}
        >
          등록
        </button>
      </div>
      <div>
        <div className="product-label">상품 이미지</div>
        <div className="product-file-list">
          <div className="product-file">
            <img className="file-icon" src={icPlus} alt="이미지등록버튼"></img>
            <label for="fileInput" class="file-label">
              이미지 등록
            </label>
          </div>
          <FileInput
            name="fileInput"
            value={productData.fileInput}
            id="fileI nput"
            onChange={handleChange}
          />
        </div>
      </div>
      <Input
        name="productName"
        type="text"
        className={"input-gray"}
        placeholder="상품명을 입력해주세요"
        label="상품명"
        onChange={handleInputChange}
      />
      <Textarea
        label="상품 소개"
        onChange={handleInputChange}
        placeholder="상품 소개를 입력해주세요"
      />
      <Input
        name="productPrice"
        type="text"
        className={"input-gray"}
        placeholder="판매 가격을 입력해주세요"
        label="판매가격"
        onChange={handleInputChange}
      />
      <div>
        <Input
          name="productTag"
          type="text"
          className={"input-gray"}
          placeholder="태그를 입력해주세요"
          label="태그"
          onChange={handleInputChange}
        />
        <Category categoryData={categoryData} />
      </div>
    </div>
  );
};

export default AddItemPage;
