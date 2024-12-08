import '../style/FileInput.css';
import FileInput from '@components/FileInput';
import { useState, useEffect, ChangeEvent } from 'react';
import TagInput from '@components/TagInput';

interface ProductCreateFormProps {
  initialValues?: {
    title: string;
    content: string;
    imgFile: File | null;
    price: string;
    tag: string[];
  };
  initialPreview: string | null;
}

const INITIAL_VALUES = {
  title: '',
  content: '',
  imgFile: null,
  price: '',
  tag: [],
};

function ProductCreateForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
}: ProductCreateFormProps) {
  const [values, setValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (
    name: string,
    value: string | string[] | File | null,
  ) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 태그 값이 변경될 때 태그 상태 업데이트
  const handleTagChange = (tags: string[]) => {
    handleChange('tag', tags);
  };

  useEffect(() => {
    const { title, content, price, tag } = values;
    // 태그 값이 배열로 존재하는지 확인
    if (title && content && price && tag.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [values]);

  return (
    <div className="ProductContainer">
      <div className="container-title">
        상품 등록하기
        <button
          className={`Registerbtn ${isFormValid ? 'active' : ''}`}
          disabled={!isFormValid}
        >
          등록
        </button>
      </div>
      <div className="container-body">
        <div className="ProductImg section-title">
          상품 이미지
          <FileInput
            name="imgFile"
            value={values.imgFile}
            initialPreview={initialPreview}
            onChange={handleChange}
          />
        </div>
        <div className="ProductTitle section-title">
          상품명
          <input
            name="title"
            placeholder="상품명을 입력해주세요"
            value={values.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="ProductIntro section-title">
          상품소개
          <textarea
            name="content"
            rows={5}
            placeholder="상품 소개를 입력해 주세요"
            value={values.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="ProductPrice section-title">
          판매가격
          <input
            name="price"
            placeholder="판매 가격을 입력해주세요"
            value={values.price}
            onChange={handleInputChange}
          />
        </div>
        {/* 태그 변경 시 부모 컴포넌트로 알림 */}
        <TagInput value={values.tag} onChange={handleTagChange} />
      </div>
    </div>
  );
}

export default ProductCreateForm;
