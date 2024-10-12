// css
import './css/AddItem.css';

// 사용한 컴포넌트
import { createItems } from './service/api.js';
import FileInput from './library/AddItem/FileInput.js';

// react hook
import { useState } from 'react';

function AddItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [values, setValues] = useState({
    images: null,
    name: '',
    description: '',
    price: '',
    tags: [],
  });

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('images[]', values.images);
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    values.tags.forEach((tag) => {
      formData.append('tags[]', tag);
    });

    console.log([...formData.entries()]);

    try {
      await createItems(formData);
      setIsLoading(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error);
      return;
    } finally {
      setIsLoading(false);
    }
    setValues({
      images: null,
      name: '',
      description: '',
      price: '',
      tags: [],
    });
  };

  // input 값 입력 시 value에 반영, tags는 split으로 문자열 -> 배열로 변환
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      handleChange(
        name,
        value.split(',').map((tag) => tag.trim())
      );
    } else {
      handleChange(name, value);
    }
  };

  // 파일 제외 input에 값 있을 때 true 반환
  const buttonActive = Boolean(
    values.name && values.description && values.price && values.tags.join('')
  );

  // 브라우저에 return 될 최종 값, price는 숫자만 입력 가능, tags는 join으로 배열 -> 문자열로 변환
  return (
    <div className="content">
      <h1>상품 등록하기</h1>
      <form onSubmit={handleSubmit}>
        {!isLoading && buttonActive && (
          <button className="buttonEnabled" type="submit">
            등록
          </button>
        )}
        {isLoading ||
          (!buttonActive && (
            <button className="buttonDisabled" type="submit" disabled>
              등록
            </button>
          ))}
        {errorMessage?.message && (
          <div className="errorMessage">상품을 등록하는데 실패했습니다.</div>
        )}
        <span>상품 이미지</span>
        <FileInput
          name="images"
          value={values.images}
          onChange={handleChange}
        />
        <label htmlFor="name">상품명</label>
        <input
          name="name"
          value={values.name}
          placeholder="상품명을 입력해주세요."
          id="name"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="description">상품 소개</label>
        <textarea
          name="description"
          value={values.description}
          placeholder="상품 소개를 입력해주세요."
          id="description"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="price">판매 가격</label>
        <input
          name="price"
          value={values.price}
          placeholder="판매 가격을 입력해주세요."
          id="price"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            handleChange('price', value);
          }}
          required
        />
        <label htmlFor="tags">태그</label>
        <input
          name="tags"
          value={values.tags.join(',')}
          placeholder="태그를 입력해주세요."
          id="tags"
          onChange={handleInputChange}
          required
        />
      </form>
    </div>
  );
}

export default AddItem;
