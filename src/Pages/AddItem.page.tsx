import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';
//
import FileInput from '../components/FileInput';
import Tag from '../components/Tag';
import Meta from '../components/Meta';
//
import styles from './AddItem.module.css';

interface Props {
  title: string;
  desc: string;
}

interface ValuesType {
  // [key: string]: any
  images: File | null;
  name: string;
  description: string;
  price: number;
  tags: string[];
}

// form 초기값
const INITIAL_VALUES: ValuesType = {
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
function AddItem({ title, desc }: Props) {
  const [values, setValues] = useState<ValuesType>(INITIAL_VALUES);
  // const tagsInput = useRef<HTMLInputElement | null>(null);

  // 값 변경에 따른 처리: 비제어
  const handleChange = (name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 인풋 값 변경에 따른 처리: 제어
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // tag 값 입력
  const handleTagsKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const el = e.currentTarget;
    const value = el.value.trim();
    const hasValue = values.tags.includes(value);

    // 빈값 & 중복 체크
    if (value && !hasValue) {
      handleChange('tags', [...values.tags, value]);
    }
    el.value = '';
  };
  // tag 값 삭제
  const onTagDelete = (idx: number) => {
    handleChange(
      'tags',
      values.tags.filter((item, index) => index !== idx),
    );
  };

  // 폼 서브밋 처리
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    console.log('폼데이터 完:', formData.get('name'));
  };

  // 등록 버튼 활성화 여부
  const disabled =
    !values.name || !values.description || !(values.price > 0) || !values.tags.length;

  return (
    <>
      <Meta title={title} description={desc} />

      <form className="mb-16 mt-6 flex flex-col gap-8" onSubmit={handleSubmit}>
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
            rows={8}
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
