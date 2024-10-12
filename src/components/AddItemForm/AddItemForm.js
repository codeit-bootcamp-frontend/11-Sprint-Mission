import { useState } from "react";
import FileInput from "../FileInput/FileInput";

const DEFALT_FORM_VALUES = {
  imgFiles: [],
  title: null,
  content: null,
  price: null,
  tags: [],
};

function AddItemForm() {
  const [values, setValues] = useState(DEFALT_FORM_VALUES);

  return (
    <form id="form-item-add">
      <div className="form-header">
        <h2>상품 등록하기</h2>
        <button type="submit">등록</button>
      </div>
      <FileInput />
      <fieldset>
        <label htmlFor="input-title">상품명</label>
        <input
          name="title"
          type="text"
          id="input-title"
          placeholder="상품명을 입력해주세요"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="input-content">상품 소개</label>
        <textarea
          name="content"
          type="text"
          id="input-content"
          placeholder="상품 소개를 입력해주세요"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="input-price">판매 가격</label>
        <input
          name="price"
          type="number"
          id="input-price"
          placeholder="상품명을 입력해주세요"
        />
      </fieldset>
      <fieldset>
        <label>상품명</label>
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
