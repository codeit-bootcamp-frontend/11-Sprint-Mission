import { useEffect, useState } from 'react';
import { switchGnbClass } from '../utils/utils';
import { TITLE } from '../info';
//
import FileInput from '../Components/FileInput';
import Tag from '../Components/Tag';
//
import styles from './AddItem.module.css';
import { Helmet } from 'react-helmet';

// form 초기값
const INITIAL_VALUES = {
  images: null,
  name: '',
  description: '',
  price: 0,
  tags: [],
};

/**
 * 상품 등록 페이지
 * @return {JSX}
 */
function AddItem() {
  const [values, setValues] = useState(INITIAL_VALUES);

  // 값 변경에 따른 처리: 비제어
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 인풋 값 변경에 따른 처리: 제어
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // tag 값 입력
  const handleTagsKeydown = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const el = e.target;
    const value = el.value.trim();
    const hasValue = values.tags.includes(value);

    // 빈값 & 중복 체크
    if (value && !hasValue) {
      handleChange('tags', [...values.tags, value]);
    }
    el.value = '';
  };
  // tag 값 삭제
  const onTagDelete = (idx) => {
    handleChange(
      'tags',
      values.tags.filter((item, index) => index !== idx)
    );
  };

  // 폼 서브밋 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    console.log('폼데이터 完:', formData.get('name'));
  };

  useEffect(() => {
    // 상단 네비 '중고마켓' 활성화
    switchGnbClass('market');

    return () => {
      // gnb 클래스 삭제
      switchGnbClass();
    };
  }, []);

  // 등록 버튼 활성화 여부
  const disabled =
    !values.name || !values.description || !(values.price > 0) || !values.tags.length;

  return (
    <>
      <Helmet>
        <title>상품 등록하기 | {TITLE}</title>
      </Helmet>

      <form className="mt-6 mb-16 flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h2 className={styles.title}>상품 등록하기</h2>
          <button className="btn" type="submit" disabled={disabled}>
            등록
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="images">상품 이미지</label>
          <FileInput name="images" value={values.images} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name">상품명</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            placeholder="상품명을 입력해주세요"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">상품 소개</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            placeholder="상품 소개를 입력해주세요"
            rows="8"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">판매 가격</label>
          <input
            id="price"
            name="price"
            min="0"
            value={values.price}
            type="number"
            placeholder="판매 가격을 입력해주세요"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags">태그</label>
          <input
            id="tags"
            type="text"
            name="tags"
            placeholder="태그를 입력해주세요"
            onKeyDown={handleTagsKeydown}
          />
          <div className="flex gap-3">
            {values.tags.map((tag, index) => (
              <Tag idx={index} onDelete={onTagDelete} key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}

export default AddItem;
