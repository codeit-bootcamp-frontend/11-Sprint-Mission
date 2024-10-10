import React from "react";
import HeadingTitleArea from "../components/common/HeadingTitleArea";
import Button from "../components/common/Button";

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
        <input type='text' />
        <HeadingTitleArea>
          <h3>상품소개</h3>
        </HeadingTitleArea>
        <textarea name='' id='' cols='30' rows='10'></textarea>
        <HeadingTitleArea>
          <h3>판매가격</h3>
        </HeadingTitleArea>
        <input type='text' />
        <HeadingTitleArea>
          <h3>태그</h3>
        </HeadingTitleArea>
        <div className='input-tag-area'>
          <input type='text' />
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
