import React, { useState, useEffect } from "react";
import DeleteButton from "../common/DeleteButton";
import "../css/FileInput.css";

const INITIAL_VALUES = {
  name: "",
  price: "",
  description: "",
};

const FileInput = ({ initialValues = INITIAL_VALUES }) => {
  // 이미지와 태그 상태를 별도로 관리
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [imgError, setImgError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const nextValue = e.target.files[0];
    if (preview) {
      setImgError("*이미지 등록은 최대 1개까지 가능합니다.");
      return;
    }
    if (nextValue) {
      const imgURL = URL.createObjectURL(nextValue);
      setPreview(imgURL);
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setImgError("");
  };

  const handleTagChange = (e) => {
    const newTag = e.target.value.trim();
    if (e.key === "Enter" && newTag !== "") {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, newTag]);
      e.target.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleValueChange = (name) => (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: e.target.value,
    }));
  };

  const isFormValid = () =>
    values.name && values.description && values.price && tags.length;

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
              onChange={handleImageChange}
            />
          </div>
          {preview && (
            <div className="image-preview">
              <img
                src={preview}
                alt="이미지 미리보기"
                className="preview-image"
              />
              <DeleteButton
                altText="프리뷰 삭제 버튼"
                onClick={handleRemovePreview}
                className="preview-delete"
              />
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
          value={values.name}
          onChange={handleValueChange("name")}
        />
      </section>
      <section className="product-content-box box">
        <p className="small-header">상품 소개</p>
        <textarea
          value={values.description}
          className="content-input input"
          placeholder="상품소개를 입력해주세요"
          onChange={handleValueChange("description")}
        />
      </section>
      <section className="box">
        <p className="small-header">판매가격</p>
        <input
          type="number"
          value={values.price}
          className="input"
          placeholder="판매가격을 입력해주세요"
          onChange={handleValueChange("price")}
        />
      </section>
      <section className="box tags-box">
        <p className="small-header">태그</p>
        <input
          type="text"
          className="input"
          placeholder="태그를 입력해주세요"
          onKeyDown={handleTagChange}
        />
        <div className="tag-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag-box">
              #{tag}
              <DeleteButton
                altText="태그 삭제 버튼"
                onClick={() => handleRemoveTag(index)}
                className="tag-delete"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FileInput;
