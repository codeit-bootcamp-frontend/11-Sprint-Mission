import { useState } from "react";
import Nav from "../components/Nav";
import FileInput from "../components/FileInput";
import Tag from "../components/Tag";
import "./AddItemPage.css";

function AddItemPage() {
  const [values, setValues] = useState({
    title: "",
    content: "",
    price: "",
    tag: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const isFormValid =
    values.title && values.content && values.price && values.tag;

  return (
    <>
      <Nav />
      <form onSubmit={handleSubmit} className="registerForm">
        <main>
          <aside className="formTop">
            <h2>상품 등록하기</h2>
            <button
              type="submit"
              disabled={!isFormValid}
              className="smallButton"
            >
              <p>등록</p>
            </button>
          </aside>
          <div className="formBody">
            <section>
              <h3>상품이미지</h3>
              <FileInput
                name="imgFile"
                value={values.imgFile}
                onChange={handleChange}
              />
            </section>
            <section>
              <h3>상품명</h3>
              <input
                name="title"
                value={values.title}
                onChange={handleInputChange}
                placeholder="상품명을 입력해주세요"
              />
            </section>
            <section>
              <h3>상품 소개</h3>
              <textarea
                name="content"
                value={values.content}
                onChange={handleInputChange}
                placeholder="상품 소개를 입력해주세요"
              />
            </section>
            <section>
              <h3>판매가격</h3>
              <input
                name="price"
                value={values.price}
                onChange={handleInputChange}
                placeholder="판매가격을 입력해주세요"
              />
            </section>
            <section>
              <h3>태그</h3>
              <div className="inputTag">
                <input
                  name="tag"
                  value={values.tag}
                  onChange={handleInputChange}
                  placeholder="태그를 입력해주세요"
                />
                <div className="tag">
                  <Tag>#티셔츠</Tag>
                  <Tag>#상의</Tag>
                </div>
              </div>
            </section>
          </div>
        </main>
      </form>
    </>
  );
}

export default AddItemPage;
