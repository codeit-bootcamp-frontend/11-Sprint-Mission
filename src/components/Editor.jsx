import "./Editor.css";
import { useState, useReducer, useRef } from "react";

import Btn from "./Button/Btn";
import FileInput from "./FileInput";
import Tag from "./Button/Tag";

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function tagsReducer(tags, action) {
  switch (action.type) {
    case "add": {
      return [
        ...tags,
        {
          id: action.id,
          text: action.text,
        },
      ];
    }

    case "delete": {
      return tags.filter((tag) => tag.id !== action.tagId);
    }

    default: {
      throw Error("알 수 없는 액션" + action.type);
    }
  }
}

function Editor() {
  const initialTags = [];
  let nextId = useRef(0);

  const [tags, dispatch] = useReducer(tagsReducer, initialTags);

  //add
  const handleAddTags = (text) => {
    if (text.trim() === "") return;
    dispatch({
      type: "add",
      id: nextId.current++,
      text: text,
    });
  };

  const handleDeleteTags = (tagId) => {
    dispatch({
      type: "delete",
      tagId: tagId,
    });
  };

  const [values, setValues] = useState({
    images: null,
    name: "",
    description: "",
    price: "",
    tags: [],
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues((prevValues) => ({
      ...prevValues,
      tags: tags,
    }));
    console.log(values);
  };

  const isFormValid = () => {
    return (
      values.name.trim() !== "" &&
      values.description.trim() !== "" &&
      values.price >= 0 &&
      tags.length > 0 // 태그가 하나 이상 있어야 함
    );
  };

  return (
    <div className="Editor">
      <form onSubmit={handleSubmit} className="Editor__form">
        <section className="Editor__header">
          <h3 className="Editor__title">상품 등록하기</h3>
          <Btn
            type={"submit"}
            text={"등록"}
            status={!isFormValid() ? "inactive" : "active"}
          />
        </section>

        <section className="Editor__inputSection">
          <label className="Editor__label">상품 이미지</label>
          <FileInput
            name="images"
            value={values.images}
            onChange={handleChange}
            disabled={values.images !== null}
          />
          {values.images ? <p className="Editor__alert">*이미지 등록은 최대 1개까지 가능합니다.</p> : null}
        </section>

        <section className="Editor__inputSection">
          <label className="Editor__label">상품명</label>
          <input
            className="Editor__input"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            placeholder="상품명을 입력해주세요"
          />
        </section>

        <section className="Editor__inputSection">
          <label className="Editor__label">상품 소개</label>
          <textarea
            className="Editor__textarea"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            placeholder="상품 소개를 입력해주세요"
          />
        </section>

        <section className="Editor__inputSection">
          <label className="Editor__label">판매 가격</label>
          <input
            className="Editor__input"
            type="number"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            placeholder="판매 가격을 입력해주세요"
          />
        </section>

        <section className="Editor__inputSection">
          <label className="Editor__label">태그</label>
          <input
            className="Editor__tagInput"
            placeholder="태그를 입력해주세요"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.nativeEvent.isComposing === false) {
                  //마지막 한글이 2번 찍히는 문제를 해결하기 위해
                  e.preventDefault();
                  handleAddTags(e.target.value);
                  e.target.value = ""; //입력 필드 초기화
                }
              }
            }}
          />
          <div className="Editor__tags">
            {tags.map((tag) => (
              <Tag
                key={tag.id}
                text={tag.text}
                hasDeleteBtn={true}
                onDelete={() => handleDeleteTags(tag.id)}
              />
            ))}
          </div>
        </section>
      </form>
    </div>
  );
}

export default Editor;
