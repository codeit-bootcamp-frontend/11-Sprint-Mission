import { useState } from "react";
import FileInput from "./FileInput";
import "./ItemForm.css";

const INITIAL_VALUES = {
  imgFile: null,
  name: "",
  description: "",
  price: "",
  tags: [],
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function ItemForm() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="pageTitle">
          <h2>상품 등록하기</h2>
          <button type="submit" className="register">
            등록
          </button>
        </div>
        <p>상품 이미지</p>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
        />
        <p>상품명</p>
        <input
          className="input name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="상품명을 입력해주세요"
        />
        <p>상품소개</p>
        <textarea
          className="input description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="상품 소개를 입력해주세요"
        />
        <p>상품가격</p>
        <input
          className="input price"
          name="price"
          value={values.price}
          onChange={handleInputChange}
          placeholder="판매 가격을 입력해주세요"
        />
        <p>태그</p>
        <input
          className="input tags"
          name="tags"
          value={values.tags}
          onChange={handleInputChange}
          placeholder="태그를 입력해주세요"
        />
      </form>
    </div>
  );
}

export default ItemForm;
