import FileInput from './library/AddItem/FileInput.js';
import { useState } from 'react';
import { createItems } from './service/api.js';

function AddItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [values, setValues] = useState({
    images: null,
    name: '',
    description: '',
    price: 0,
    tags: [],
  });

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
      price: 0,
      tags: [],
    });
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  function sanitize(type, value) {
    switch (type) {
      case 'number':
        return Number(value) || 0;

      default:
        return value;
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'tags') {
      handleChange(
        name,
        value.split(',').map((tag) => tag.trim())
      );
    } else {
      handleChange(name, sanitize(type, value));
    }
  };

  return (
    <div>
      <h1>상품 등록하기</h1>
      <form onSubmit={handleSubmit}>
        {!isLoading && <button type="submit">등록</button>}
        {errorMessage?.message && <div>"상품을 불러오는데 실패했습니다."</div>}
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
          type="number"
          value={values.price}
          placeholder="판매 가격을 입력해주세요."
          id="price"
          onChange={handleInputChange}
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
