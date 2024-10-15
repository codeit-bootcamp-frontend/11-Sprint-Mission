import React, { useState } from "react";
import "../css/FileInput.css";

const FileInput = ({ value, onChange, onInputChange }) => {
  const { tags, price, description, name } = value;
  const [preview, setPreview] = useState(null);
  const [imgError, setImgError] = useState("");

  const handleChange = (e) => {
    // 이미지 세트함수
    const nextValue = e.target.files[0];
    if (preview) {
      setImgError("*이미지 등록은 최대 1개까지 가능합니다.");
      return;
    }
    onChange("images", nextValue);

    if (nextValue) {
      // 이미지 프리뷰
      const imgURL = URL.createObjectURL(nextValue);
      setPreview(imgURL);
      return () => {
        setPreview();
        URL.revokeObjectURL(nextValue);
      };
    }
  };

  const handleRemovePreview = (preview) => {
    //이미지 프리뷰, 에러메세지 삭제
    setPreview(null);
    setImgError("");
  };

  const handleTagChange = (e) => {
    //태그 입력 및 엔터
    const newTag = e.target.value.trim();
    if (e.key === "Enter" && newTag !== "") {
      e.preventDefault();
      const updatedTags = [...tags, newTag];
      onChange("tags", updatedTags);
      e.target.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    // 태그 제거
    const updatedTags = tags.filter((_, i) => i !== index);
    onChange("tags", updatedTags);
  };

  const isFormValid = () => {
    //등록 버튼 활성화 가능?
    return name && description && price && tags.length > 0;
  };
  return (
    <div className="fileInput-box">
      <section className="register-box">
        <p className="register-box-header">상품 등록하기</p>
        <button className="register-box-button" disabled={!isFormValid()}>
          등록
        </button>
      </section>
      <section className="image-register-box">
        <p className="image-register-box-header small-header">상품 이미지</p>
        <div className="image-box">
          <div>
            <div className="image-upload-button">
              <label htmlFor="image-upload">
                <p className="upload-button-plus">+</p>
                <p className="upload-button-text">이미지등록</p>
              </label>
            </div>
            <input
              type="file"
              id="image-upload"
              name="images"
              onChange={handleChange}
            />
          </div>
          {preview && (
            <div className="image-preview">
              <img
                src={preview}
                alt="이미지 미리보기"
                className="preview-image"
              />
              <button
                className="preview-delete"
                onClick={() => handleRemovePreview(preview)}
              >
                <img src="/assets/ic_X.png" alt="프리뷰 삭제 버튼" />
              </button>
            </div>
          )}
        </div>
        {imgError && <p className="img-error">{imgError}</p>}
      </section>
      <section className="name-input-box box">
        <p className="small-header">상품명</p>
        <input
          type="text"
          className="name-input input"
          placeholder="상품명을 입력해주세요"
          name="name"
          value={name}
          onChange={onInputChange}
        ></input>
      </section>
      <section className="product-content-box box">
        <p className="small-header">상품 소개</p>
        <textarea
          name="description"
          value={description}
          className="content-input input"
          placeholder="상품소개를 입력해주세요"
          onChange={onInputChange}
        ></textarea>
      </section>
      <section className="box">
        <p className="small-header">판매가격</p>
        <input
          name="price"
          type="number"
          value={price}
          className="input"
          placeholder="판매가격을 입력해주세요"
          onChange={onInputChange}
        ></input>
      </section>
      <section className="box tags-box">
        <p className="small-header">태그</p>
        <input
          type="text"
          className="input"
          placeholder="태그를 입력해주세요"
          onKeyDown={handleTagChange}
        ></input>
        <div className="tag-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag-box">
              #{tag}
              <button
                className="tag-delete"
                onClick={() => handleRemoveTag(index)}
              >
                <img src="/assets/ic_X.png" alt="태그 삭제 버튼" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FileInput;
