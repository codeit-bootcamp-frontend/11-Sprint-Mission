import React from "react";
import styles from "./AddItem.module.scss";
import HeadingTitleArea from "../components/common/HeadingTitleArea";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import InputFile from "../components/AddItem/InputFile";
import TagsList from "../components/common/TagsList";

function AddItem() {
  return (
    <main className="page-addItem">
      <div className="container">
        <form>
          <HeadingTitleArea>
            <h2>상품 등록하기</h2>
            <Button
              link={false}
              className="post"
              styleType="square gray small_40">
              등록
            </Button>
          </HeadingTitleArea>
          <div className={styles.inputTextArea}>
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
              />
            </div>
            <div>
              <HeadingTitleArea>
                <h3>상품소개</h3>
              </HeadingTitleArea>
              <Input
                isInput={false}
                placeholder="상품 소개를 입력해주세요"
                name="productDescription"
              />
            </div>
            <div>
              <HeadingTitleArea>
                <h3>판매가격</h3>
              </HeadingTitleArea>
              <Input
                placeholder="판매 가격을 입력해주세요"
                inputName="productPrice"
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
                />
                <TagsList />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddItem;
