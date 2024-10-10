import React from "react";
import HeadingTitleArea from "../components/common/HeadingTitleArea";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function AddItem() {
  return (
    <main className='page-addItem'>
      <div className='container'>
        <HeadingTitleArea>
          <h2>상품 등록하기</h2>
          <Button
            link={false}
            className='post'
            styleType='square gray small_40'
          >
            등록
          </Button>
        </HeadingTitleArea>
        <HeadingTitleArea>
          <h3>상품이미지</h3>
        </HeadingTitleArea>
        <input type='file' />
        <HeadingTitleArea>
          <h3>상품명</h3>
        </HeadingTitleArea>
        <Input placeholder='상품명을 입력해주세요' inputName='productName' />
        <HeadingTitleArea>
          <h3>상품소개</h3>
        </HeadingTitleArea>
        <Input
          isInput={false}
          placeholder='상품 소개를 입력해주세요'
          name='productDescription'
        />
        <HeadingTitleArea>
          <h3>판매가격</h3>
        </HeadingTitleArea>
        <Input
          placeholder='판매 가격을 입력해주세요'
          inputName='productPrice'
        />
        <HeadingTitleArea>
          <h3>태그</h3>
        </HeadingTitleArea>
        <div className='input-tag-area'>
          <Input placeholder='태그를 입력해주세요' inputName='productTag' />
          <ul className='input-tag-list'>
            <li className='input-tag-item'>#티셔츠</li>
            <li className='input-tag-item'>#상의</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default AddItem;
