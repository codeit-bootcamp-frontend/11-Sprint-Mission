import { useEffect, useState } from "react";
import FileInput from "../FileInput/FileInput";
import "./AddItemForm.css";
import ic_tag_x from "../../assets/images/ic_tag_x.svg";

const DEFAULT_FORM_VALUES = {
  images: [],
  title: null,
  content: null,
  price: null,
  tags: [],
};

const DEFAULT_VALUES_VALID = {
  title: { ok: false, msg: null },
  content: { ok: false, msg: null },
  price: { ok: false, msg: null },
  tags: { ok: false, msg: null },
};

const PLACEHOLDER = {
  title: "상품명을 입력해주세요",
  content: "상품 소개를 입력해주세요",
  price: "판매 가격을 입력해 주세요",
  tags: "태그를 입력해주세요",
};

const checkValueFormat = {
  title: (title) => {
    if (title.length < 1) return { ok: false, msg: "상품명을 입력하세요" };
    return { ok: true, msg: null };
  },
  content: (content) => {
    if (content.length < 1) return { ok: false, msg: "상품 소개를 입력하세요" };
    return { ok: true, msg: null };
  },
  price: (price) => {
    if (price.length < 1) return { ok: false, msg: "상품 가격을 입력하세요" };
    const _price = Number(price);
    if (Number.isNaN(_price))
      return { ok: false, msg: "상품 가격은 숫자만 입력할 수 있습니다." };
    if (_price < 0)
      return { ok: false, msg: "상품 가격은 음수가 될 수 없습니다." };
    return { ok: true, msg: null };
  },
  tags: (tags) => {
    if (tags.length < 1)
      return { ok: false, msg: "태그를 하나 이상 입력하세요" };
    return { ok: true, msg: null };
  },
};

function AddItemForm() {
  const [values, setValues] = useState(DEFAULT_FORM_VALUES);
  const [isValuesValid, setIsValuesValid] = useState(DEFAULT_VALUES_VALID);
  const [isFormValid, setIsFromValid] = useState(false);

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
      handleInputValid(name, _value);
      return {
        ...prev,
        [name]: result,
      };
    });
  };

  /**
   * 주어진 name과 value를 기반으로 상태에서 값을 삭제하는 핸들러
   * @param {string} name 삭제할 값이 포함된 상태의 키
   * @param {*} value 삭제할 값.
   * @param {string} [key] 객체 배열에서 삭제할 특정 키. 제공되지 않으면 값 자체로 필터링합니다.
   * @example
   * ```
   * // name, value 전달
   * values[name] : prev -> value
   * // name, value, key 전달
   * values[name] : { key : prev } -> { key : value }
   * ```
   */
  const handleDelete = (name, value, key) => {
    setValues((prev) => {
      const result = key
        ? prev[name].filter((e) => e[key] !== value)
        : prev[name].filter((e) => e !== value);
      handleInputValid(name, result);
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

  const handleInputValid = (name, value) => {
    const isValid = checkValueFormat[name];
    if (!isValid) return;
    const result = isValid(value);
    setIsValuesValid((prev) => ({
      ...prev,
      [name]: result,
    }));
  };

  const handlePreventEnterSubmit = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  useEffect(() => {
    let flag = true;
    for (const name in isValuesValid) {
      const { ok } = isValuesValid[name];
      if (!ok) flag = false;
    }
    setIsFromValid(flag);
  }, [isValuesValid]);

  return (
    <form id="form-item-add" onKeyDown={handlePreventEnterSubmit}>
      <header className="header-form">
        <h2>상품 등록하기</h2>
        <button type="submit" disabled={!isFormValid}>
          등록
        </button>
      </header>
      <FileInput
        name="images"
        onChange={handleChange}
        onDelete={handleDelete}
        value={values.images}
      />
      <InputField
        label="상품명"
        name="title"
        valid={isValuesValid["title"]}
        onChange={handleInputChange}
      />
      <InputField
        label="상품 소개"
        htmlTag="textarea"
        name="content"
        valid={isValuesValid["content"]}
        onChange={handleInputChange}
      />
      <InputField
        label="판매 가격"
        name="price"
        valid={isValuesValid["price"]}
        onChange={handleInputChange}
      />
      <TagInput
        name="tags"
        value={values.tags}
        valid={isValuesValid["tags"]}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </form>
  );
}

/**
 * values의 값을 입력하기 위한 컴포넌트
 * @param {object} props
 * @param {string} [props.htmlTag] 입력 요소의 태그명. input의 기본
 * @param {string} props.name values의 _key_
 * @param {object} props.valid value의 유효성
 * @param {function} props.onChange inputChange 핸들러
 * @returns 입력 컴포넌트
 */
function InputField({ label, htmlTag = "input", name, valid, onChange }) {
  return (
    <fieldset>
      <label htmlFor={`input-${name}`}>
        {label}
        {valid.msg && <span className="error">{valid.msg}</span>}
      </label>
      {htmlTag === "textarea" ? (
        <textarea
          name={name}
          type="text"
          id={`input-${name}`}
          className={valid.msg && "error"}
          placeholder={PLACEHOLDER[name]}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          type="text"
          id={`input-${name}`}
          className={valid.msg && "error"}
          placeholder={PLACEHOLDER[name]}
          onChange={onChange}
        />
      )}
    </fieldset>
  );
}

/**
 * 태그를 추가하거나 삭제할 수 있는 컴포넌트
 * @param {object} props
 * @param {string} props.name values의 _key_
 * @param {*} props.value - values[name] 상태 값
 * @param {function} props.onChange values 갑을 변경 혹은 삽입할 수 이는 핸들러
 * @param {function} props.onDelete values 겂울 삭재헐 수 있는 핸들러
 * @returns 태그 컴포넌트
 */
function TagInput({ name, value, valid, onChange, onDelete }) {
  /**
   * 태그 삽입 이벤트 핸들러. 엔터 키다운 시 동작함. 중복 입력은 허용하지 않는다.
   * @param {Event} event
   */
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      const tag = event.target.value.trim();
      let flag = true;
      value.every((e) => (flag = e !== tag));
      flag && onChange(name, tag);
      event.target.value = "";
    }
  };

  const handleDelete = (e) => {
    const tag = e.currentTarget.dataset.tag;
    onDelete(name, tag);
  };

  return (
    <fieldset>
      <label htmlFor="input-tags">
        태그
        {valid?.msg && <span className="error">{valid?.msg}</span>}
      </label>
      <input
        name="tags"
        type="text"
        id="input-tags"
        className={valid.msg && "error"}
        placeholder={PLACEHOLDER["tags"]}
        onKeyDown={handleEnter}
      />
      <ul className="wrap-tags">
        {value.map((e) => (
          <li key={e}>
            <Tag tag={e} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

function Tag({ tag, onDelete }) {
  return (
    <div className="tag">
      <div>{`#${tag}`}</div>
      <img src={ic_tag_x} alt="태그 삭제" data-tag={tag} onClick={onDelete} />
    </div>
  );
}

export default AddItemForm;