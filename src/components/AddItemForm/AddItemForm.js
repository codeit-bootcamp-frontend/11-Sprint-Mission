import { useState } from "react";
import FileInput from "../FileInput/FileInput";
import "./AddItemForm.css";

const DEFALT_FORM_VALUES = {
  images: [],
  title: "",
  content: "",
  price: 0,
  tags: [],
};

function AddItemForm() {
  const [values, setValues] = useState(DEFALT_FORM_VALUES);

  const handleChange = (name, value) => {
    const nextValue = Array.isArray(values[name])
      ? [...values[name], value]
      : value;

    setValues((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <form id="form-item-add">
      <header className="header-form">
        <h2>상품 등록하기</h2>
        <button type="submit">등록</button>
      </header>
      <FileInput onChange={handleChange} value={values.images} />
      <fieldset>
        <label htmlFor="input-title">상품명</label>
        <input
          name="title"
          type="text"
          id="input-title"
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="input-content">상품 소개</label>
        <textarea
          name="content"
          type="text"
          id="input-content"
          placeholder="상품 소개를 입력해주세요"
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="input-price">판매 가격</label>
        <input
          name="price"
          type="number"
          id="input-price"
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="input-tag">태그</label>
        <input
          name="tag"
          type="text"
          id="input-tag"
          placeholder="상품명을 입력해주세요"
        />
        <div className="list-tag"></div>
      </fieldset>
    </form>
  );
}

export default AddItemForm;
