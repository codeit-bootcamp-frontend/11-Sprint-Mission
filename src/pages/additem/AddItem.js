import "./AddItem.css";
import Banner from "../../components/Banner/Banner";
import { useState } from "react";

function AddItem() {
  // const [image, setImage] = useState(null); // 이미지 파일 상태
  const [values, setValues] = useState({
    title: " ",
    content: " ",
    price: 0,
    image: null,
  });

  const handleValues = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 이미지 파일 선택 시 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // file 변수를 const로 선언
    setValues((prevValues) => ({
      ...prevValues,
      image: file,
    }));
  };

  const handleSubmit = (e) => {};

  return (
    <div>
      <Banner />
      <main>
        <div>
          <h1>상품 등록하기</h1>
          <button type="submit">등록</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>상품이미지</label>
            <input
              name="image"
              type="file"
              value={values.image}
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label>상품명</label>
            <input
              name="title"
              type="text"
              value={values.title}
              onChange={handleValues}
              Placeholder="상품명을 입력해주세요."
            />
          </div>
          <div>
            <label>상품소개</label>
            <textarea
              name="content"
              value={values.content}
              onChange={handleValues}
              placeholder="상품 소개를 입력해주세요."
            />
          </div>
          <div>
            <div>
              <label>판매가격</label>
              <input
                name="price"
                type="number"
                value={values.price}
                onChange={handleValues}
                placeholder="판매가격을 입력해주세요."
              />
            </div>
          </div>
        </form>
        {/* <div>
            <label>태그</label>
            <input type="text" placeholder="태그를 입력해주세요." />
          </div> */}
      </main>
    </div>
  );
}

export default AddItem;
