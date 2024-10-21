import { useEffect, useState } from "react";
import "./AddProduct.css";
import FileInput from "./FileInput";
import InputField from "./FormInput";

const AddProduct = () => {
  const [values, setValues] = useState({
    imgFile: null,
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  const [tags, setTags] = useState([]); // values로 넘겨줄 state
  const [tagInputValue, setTagInputValue] = useState(""); // tag input의 value를 저장할 state

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // 터미널 오류가 계속 보여서 일단 setIsSubmitDisabled 제거

  const handleFileChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFileChange(name, value);
  };

  // tag input에 value 값 저장
  const onChange = (e) => {
    setTagInputValue(e.target.value);
  };

  // 빈 값으로 엔터키 입력 시, return
  // tag input의 value 값을 tags 배열에 추가
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.trim() === "") {
        return;
      }

      setTags((prevTags) => [...prevTags, tagInputValue]);
      setTagInputValue("");
    }
  };

  // tags 배열의 값을 values에 추가
  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: tags,
    }));
  }, [tags]);

  // tag 삭제
  const handleDeleteClick = (tagIdx) => {
    setTags(tags.filter((tag, idx) => idx !== tagIdx));
  };

  // 조건 성립 시 등록 버튼 활성화
  useEffect(() => {
    if (
      values.name.trim() !== "" &&
      values.description.trim() !== "" &&
      values.price.trim() !== "" &&
      values.tags.length > 0
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [values]);

  // 상품 가격 3자리마다 콤마 추가, 모바일에서 text 입력되는 경우도 해결
  const onInput = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = onlyDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    e.target.value = formattedValue;
  };

  return (
    <div className="addItem__inner">
      <div className="addItem__head">
        <h2>상품 등록하기</h2>

        <button className="addBtn" disabled={isSubmitDisabled}>
          등록
        </button>
      </div>
      <div>
        <label>상품 이미지</label>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleFileChange}
        />
      </div>

      <InputField
        labelName="상품명"
        name="name"
        htmlForId="productName"
        type="text"
        value={values.name}
        placeholder="상품명을 입력해주세요"
        onChange={handleChange}
      />

      <div>
        <label htmlFor="description">상품 소개</label>
        <textarea
          name="description"
          id="description"
          value={values.description}
          placeholder="상품 소개를 입력해주세요"
          onChange={handleChange}
        ></textarea>
      </div>

      <InputField
        labelName="판매가격"
        name="price"
        htmlForId="price"
        type="text"
        value={values.price}
        placeholder="판매 가격을 입력해주세요"
        onChange={handleChange}
        onInput={onInput}
      />

      <InputField
        labelName="태그"
        htmlForId="tag"
        type="text"
        value={tagInputValue}
        placeholder="태그를 입력해주세요"
        onKeyDown={onKeyDown}
        onChange={onChange}
      ></InputField>

      {tags.length !== 0 && (
        <ul className="tagList">
          {tags.map((tag, idx) => {
            return (
              <li key={idx}>
                #{tag}
                <button onClick={() => handleDeleteClick(idx)}></button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AddProduct;
