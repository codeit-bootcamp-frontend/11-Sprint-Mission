import { useState } from "react";
import FileInput from "../components/FileInput";
import style from "../css/addItems.module.css";
import iconX from "../img/ic_X.png";

const AddItem = () => {
  const [values, setValues] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productTag: "",
    imgFile: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <>
      <div>
        <div className={style.container}>
          <div className={style.titleHeader}>
            <h2 className={style.title}>상품 등록하기</h2>
            <button
              type="submit"
              className={style.btnPrimary}
              form="addItemForm"
            >
              등록
            </button>
          </div>
          <form className={style.addItemsForm} onSubmit={handleSubmit}>
            <div className={style.labelInputWrapper}>
              <h2 className={style.subTitle}>상품 이미지</h2>
              <FileInput
                name="imgFile"
                value={values.imgFile}
                onChange={handleChange}
              />
            </div>

            <div className={style.labelInputWrapper}>
              <h2 className={style.subTitle}>상품명</h2>
              <input
                className={style.inputField}
                name="productName"
                value={values.productName}
                onChange={handleInputChange}
                placeholder="상품명을 입력해주세요"
              />
            </div>
            <div className={style.labelInputWrapper}>
              <h2 className={style.subTitle}>상품소개</h2>
              <textarea
                className={style.largeTextareaField}
                name="productDescription"
                value={values.productDescription}
                onChange={handleInputChange}
                placeholder="상품 소개를 입력해주세요"
              />
            </div>
            <div className={style.labelInputWrapper}>
              <h2 className={style.subTitle}>판매가격</h2>
              <input
                className={style.inputField}
                name="productPrice"
                value={values.productPrice}
                onChange={handleInputChange}
                placeholder="판매가격을 입력해주세요"
              />
            </div>
            <div className={style.labelInputWrapper}>
              <h2 className={style.subTitle}>태그</h2>
              <input
                className={style.inputField}
                name="productTag"
                value={values.productTag}
                onChange={handleInputChange}
                placeholder="태그를 입력해주세요"
              />
              <div className={style.tagContainer}>
                <div className={style.tagItem}>
                  <span className={style.tagFont}>#티셔츠</span>
                  <button className={style.deleteButton}>
                    <img
                      src={iconX}
                      alt="삭제 아이콘"
                      className={style.deleteIcon}
                    />
                  </button>
                </div>
                <div className={style.tagItem}>
                  <span className={style.tagFont}>#상의</span>
                  <button className={style.deleteButton}>
                    <img
                      src={iconX}
                      alt="삭제 아이콘"
                      className={style.deleteIcon}
                    />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
