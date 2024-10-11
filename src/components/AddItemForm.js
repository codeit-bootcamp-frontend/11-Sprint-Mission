import { useState, useEffect } from "react";
import FileInput from "./FileInput";
import useAsync from "../hooks/useAsync";
import "./AddItemForm.css";
import resetImg from "../assets/ic_X.svg";

const INITIAL_VALUE = {
  name: "",
  favorite: 0,
  content: "",
  price: "",
  imgFile: null,
  tags: [],
};

function AddItemForm({
  className = "",
  initialValues = INITIAL_VALUE,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const [isFormValid, setIsFormValid] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const isValid =
      values.name &&
      values.content &&
      values.imgFile &&
      values.price &&
      values.tags.length > 0;
    setIsFormValid(isValid);
  }, [values]);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleFileChange = (name, file) => {
    handleChange(name, file);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !values.tags.includes(tagInput.trim())) {
      handleChange("tags", [...values.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleTagRemove = (tagToRemove) => {
    handleChange(
      "tags",
      values.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("favorite", values.favorite);
    formData.append("content", values.content);
    formData.append("price", values.price);
    formData.append("imgFile", values.imgFile);
    formData.append("tags", JSON.stringify(values.tags));

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    setValues(INITIAL_VALUE);
    onSubmitSuccess(review);
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form-total-container">
      <div className="add-item-form-header">
        <div className="add-item-form-title">상품 등록하기</div>
        <button
          type="submit"
          className="add-item-submit-button"
          disabled={!isFormValid || isSubmitting}
        >
          등록
        </button>
      </div>
      <div className="add-item-form-container">
        <div className="add-item-img-container">
          <div className="add-item-img-title">상품 이미지</div>
          <FileInput
            className="add-item-img-preview"
            name="imgFile"
            value={values.imgFile}
            initialPreview={initialPreview}
            onChange={handleFileChange}
          />
        </div>
        <div className="add-item-name-container">
          <div className="add-item-name-title">상품명</div>
          <input
            className="add-item-name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            placeholder="상품명을 입력해주세요"
          />
        </div>
        <div className="add-item-content-container">
          <div className="add-item-content-title">상품 소개</div>
          <textarea
            className="add-item-content"
            name="content"
            value={values.content}
            onChange={handleInputChange}
            placeholder="상품 소개를 입력해주세요"
          />
        </div>
        <div className="add-item-price-container">
          <div className="add-item-price-title">판매가격</div>
          <input
            className="add-item-price"
            type="number"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            placeholder="판매 가격을 입력해주세요"
          />
        </div>
        <div className="add-item-tags-container">
          <div className="add-item-tags-title">태그</div>
          <input
            className="add-item-tag-input"
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            placeholder="태그를 입력해주세요"
          />
          <div className="add-item-tags-list">
            {values.tags.map((tag) => (
              <div key={tag} className="add-item-tag">
                #{tag}
                <button
                  type="button"
                  className="add-item-tag-remove-button"
                  onClick={() => handleTagRemove(tag)}
                >
                  <img src={resetImg} alt="제거" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddItemForm;
