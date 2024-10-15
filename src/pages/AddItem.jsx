import React, { useState } from "react";
import styles from "./AddItem.module.scss";
import HeadingTitleArea from "../components/common/HeadingTitleArea";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import InputFile from "../components/common/InputFile";
import TagsList from "../components/common/TagsList";

function AddItem() {
  const [formValues, setFormValues] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productTag: "",
  });

  const isFormValid = Object.values(formValues).every(
    (value) => value.trim() !== ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <main className="page-addItem">
      <div className="container">
        <form>
          <HeadingTitleArea>
            <h2>상품 등록하기</h2>
            <Button
              link={false}
              className="post"
              styleType={`square small_40 ${!isFormValid ? "gray" : "blue"}`}
              disabled={!isFormValid && Object.values(formValues).length > 0}>
              등록
            </Button>
          </HeadingTitleArea>
          <div className={styles["input-text-area"]}>
            <div>
              <HeadingTitleArea>
                <h3>상품이미지</h3>
              </HeadingTitleArea>
              <InputFile />
            </div>
            <div>
              <HeadingTitleArea>
                <h3>상품명</h3>
              </HeadingTitleArea>
              <Input
                placeholder="상품명을 입력해주세요"
                inputName="productName"
                value={formValues.productName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <HeadingTitleArea>
                <h3>상품소개</h3>
              </HeadingTitleArea>
              <textarea
                className="default"
                name="productDescription"
                placeholder="상품 소개를 입력해주세요"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <HeadingTitleArea>
                <h3>판매가격</h3>
              </HeadingTitleArea>
              <Input
                type="number"
                placeholder="판매 가격을 입력해주세요"
                inputName="productPrice"
                value={formValues.productPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <HeadingTitleArea>
                <h3>태그</h3>
              </HeadingTitleArea>
              <div className={styles["input-tag-area"]}>
                <Input
                  placeholder="태그를 입력해주세요"
                  inputName="productTag"
                  value={formValues.productTag}
                  onChange={handleInputChange}
                />
                <TagsList tags={["티셔츠", "상의"]} remove={true} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddItem;
