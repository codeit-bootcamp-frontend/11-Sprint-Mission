import React, { useState } from "react";
import "./AddItemPages.css";
import Input from "../components/Input";
import FileInput from "../components/FileInput";
import icPlus from "../images/icon/ic_plus.svg";

const INITIAL_DATA = {
  productName: "",
  productInt: "",
  productPrice: "",
  productTag: "",
  fileInput: null,
};

const AddItemPages = () => {
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
            id="fileInput"
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
      <div>
        <label className="product-label">상품 소개</label>
        <textarea
          name="productInt"
          className="textarea"
          placeholder="상품 소개를 입력해주세요"
          onChange={handleInputChange}
        ></textarea>
      </div>
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
        <div className="tag-area">
          <div className="tag-box">
            #티셔츠<button className="tag-cancle"></button>
          </div>
          <div className="tag-box">
            #티셔츠<button className="tag-cancle"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemPages;
