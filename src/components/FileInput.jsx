import React from "react";
import "../css/FileInput.css";

const FileInput = () => {
  return (
    <div className="fileInput-box">
      <section className="register-box">
        <p className="register-box-header">상품 등록하기</p>
        <button className="register-box-button">등록</button>
      </section>
      <section className="image-register-box">
        <p className="image-register-box-header small-header">상품 이미지</p>
        <div>
          <div className="image-upload-button">
            <label htmlFor="image-upload">
              <p className="upload-button-plus">+</p>
              <p className="upload-button-text">이미지등록</p>
            </label>
          </div>
          <input type="file" id="image-upload" />
        </div>
      </section>
      <section className="name-input-box box">
        <p className="small-header">상품명</p>
        <input
          className="name-input input"
          placeholder="상품명을 입력해주세요"
        ></input>
      </section>
      <section className="product-content-box box">
        <p className="small-header">상품 소개</p>
        <textarea
          className="content-input input"
          placeholder="상품소개를 입력해주세요"
        ></textarea>
      </section>
      <section className="box">
        <p className="small-header">판매가격</p>
        <input className="input" placeholder="판매가격을 입력해주세요"></input>
      </section>
      <section className="box">
        <p className="small-header">태그</p>
        <input className="input" placeholder="태그를 입력해주세요"></input>
      </section>
      <section>
        <p>태그 적히는 곳</p>
      </section>
    </div>
  );
};

export default FileInput;
