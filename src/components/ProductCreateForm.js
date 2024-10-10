import '../style/FileInput.css';
import FileInput from './FileInput';
import { useState } from 'react';

const INITIAL_VALUES = {
  title: '',
  content: '',
  imgFile: null,
  price: 0,
  tag: null,
};

function ProductCreateForm(initialValues = INITIAL_VALUES, initialPreivew) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  return (
    <div className="ProductContainer">
      <div className="container-title">
        상품 등록하기
        <button className="Registerbtn">등록</button>
      </div>
      <div className="container-body">
        <div className="ProductImg section-title">
          상품 이미지
          <FileInput
            name="imgFile"
            value={values.imgFile}
            initialPreivew={initialPreivew}
            onChange={handleChange}
          />
        </div>
        <div className="ProductTitle section-title">
          상품명
          <input name="title" placeholder="상품명을 입력해주세요"></input>
        </div>
        <div className="ProductIntro section-title">
          상품소개
          <textarea
            name="content"
            rows={5}
            placeholder="상품 소개를 입력해 주세요"
          ></textarea>
        </div>
        <div className="ProductPrice section-title">
          판매가격
          <input name="price" placeholder="판매 가격을 입력해주세요"></input>
        </div>
        <div className="ProductTag section-title">
          태그<input name="tag" placeholder="태그를 입력해주세요"></input>
        </div>
      </div>
    </div>
  );
}

export default ProductCreateForm;
