import { useState } from "react";
import FileInput from "../FileInput/FileInput";
import "./AddItemForm.css";

const DEFALT_FORM_VALUES = {
  images: [],
  title: null,
  content: null,
  price: null,
  tags: [],
};

function AddItemForm() {
  const [values, setValues] = useState(DEFALT_FORM_VALUES);

  /**
   * values에 값의 변경하거나 삽입하기 위한 핸들러
   * @param {stirng} name values의 _key_. 변경하거나 삽입할 값의 이름
   * @param {*} value 변경 혹은 삽입할 값. 문자열 타입일 경우 좌우 공백이 제거됩니다.
   * @example
   * ```
   * // 원시 타입 변수
   * values[name] : 'primitive' -> value
   * // 참조 타입 변수
   * values[name] : [ ...prev ] -> [ ...prev, value ]
   * ```
   */
  const handleChange = (name, value) => {
    setValues((prev) => {
      const _value = typeof value === "string" ? value.trim() : value;
      const result = Array.isArray(prev[name])
        ? [...prev[name], _value]
        : _value;
      return {
      ...prev,
        [name]: result,
      };
    });
  };

  /**
   * 주어진 이름(name)과 값(value)을 기반으로 상태에서 값을 삭제하는 핸들러
   * @param {string} name 삭제할 값이 포함된 상태의 키
   * @param {*} [value] 삭제할 값. 값이 없을 경우 해당 키의 기본값으로 초기화됩니다.
   * @param {string} [key] 객체 배열에서 삭제할 특정 키. 제공되지 않으면 값 자체로 필터링합니다.
   * @example
   * ```
   * // name 전달
   * values[name] : prev -> DEFAULT_FORM_VLAUE[name]
   * // name, value 전달
   * values[name] : prev -> value
   * // name, value, key 전달
   * values[name] : { key : prev } -> { key : value }
   * ```
   */
  const handleDelete = (name, value, key) => {
    if (!name) throw new Error("name을 아규먼트에 추가하세요");

    if (!value) {
      setValues((prev) => ({
        ...prev,
        [name]: DEFALT_FORM_VALUES[name],
      }));
      return;
    }

    if (!key) {
      setValues((prev) => {
        const result = prev[name].filter((e) => e !== value);
        return {
          ...prev,
          [name]: result,
        };
      });
      return;
    }

    setValues((prev) => {
      const result = prev[name].filter((e) => e[key] !== value);
      return {
        ...prev,
        [name]: result,
      };
    });
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
      <FileInput
        name="images"
        onChange={handleChange}
        onDelete={handleDelete}
        value={values.images}
      />
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
