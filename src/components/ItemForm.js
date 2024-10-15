import { useState, useEffect } from "react";
import FileInput from "./FileInput";
import DELETE from "../img/icon/ic_X.png";
import "../css/ItemForm.css";

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
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setValues(INITIAL_VALUES);
    setTags([]);
    setTagInputValue("");
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

  const handleTagChange = (e) => {
    setTagInputValue(e.target.value.trim());
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInputValue.trim() !== "") {
      e.preventDefault();

      if (!tags.includes(tagInputValue.trim())) {
        setTags((prevTags) => [...prevTags, tagInputValue]);
        setTagInputValue("");
      }
    }
  };

  const handleTagDelete = (DeleteTag) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== DeleteTag));
  };

  useEffect(() => {
    setValues((prevTags) => ({
      ...prevTags,
      tags,
    }));
  }, [tags]);

  const isRegisterValid = () => {
    if (
      values.name !== "" &&
      values.description !== "" &&
      values.price !== "" &&
      values.tags.length !== 0
    )
      return false;
    else return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="pageTitle">
          <h2>상품 등록하기</h2>
          <button
            disabled={isRegisterValid()}
            type="submit"
            className="register"
          >
            등록
          </button>
        </div>
        <p className="formTitle">상품 이미지</p>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
        />
        <p className="formTitle">상품명</p>
        <input
          className="input name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="상품명을 입력해주세요"
        />
        <p className="formTitle">상품소개</p>
        <textarea
          className="input description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="상품 소개를 입력해주세요"
        />
        <p className="formTitle">상품가격</p>
        <input
          className="input price"
          name="price"
          value={values.price}
          onChange={handleInputChange}
          placeholder="판매 가격을 입력해주세요"
        />
        <p className="formTitle">태그</p>
        <input
          className="input tags"
          name="tags"
          value={tagInputValue}
          onChange={handleTagChange}
          onKeyDown={handleTagKeyDown}
          placeholder="태그를 입력해주세요"
        />
        {tags.length !== 0 && (
          <ul className="tagArray">
            {tags.map((tag, idx) => {
              return (
                <li key={idx}>
                  {tag}
                  <img
                    className="DeleteIcon"
                    src={DELETE}
                    alt="태그 삭제"
                    onClick={() => handleTagDelete(tag)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </form>
    </div>
  );
}

export default ItemForm;
