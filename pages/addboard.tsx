import React, { useRef, useState } from 'react';
import styles from '@/styles/Addboard.module.css';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import useResize from '@/hooks/useResize';
import FileInput from '@/components/common/FileInput';
import { create } from 'domain';
import { createProduct } from '@/api/productApi';

export interface InputDataProps {
  name: string;
  description: string;
  images: string[];
  tags: string[];
  price: number;
}

const Addboard = () => {
  const screenType = useResize(); // useResize 훅 사용

  const [inputData, setInputData] = useState<InputDataProps>({
    name: '',
    description: '',
    images: [],
    price: 0,
    tags: ['1', '2'],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(inputData);
  };

  const onChangeFile = (url: string) => {
    setInputData((prevData) => ({
      ...prevData,
      images: [url],
    }));
  };

  const getTextTitle = () => {
    return screenType === 'desktop' ? '게시글 쓰기' : '상품 등록하기';
  };

  const isFormValid = Object.values(inputData).every((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '';
  });

  const handleRegistClick = async () => {
    try {
      await createProduct(inputData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.addboard}>
        <div className={styles['addboard-header']}>
          <h2>{getTextTitle()}</h2>
          {/* 버튼 css 안됨 */}
          <Button
            addClassName={styles.buttonMiddle}
            disabled={!isFormValid}
            handleClick={handleRegistClick}
          >
            등록
          </Button>
        </div>
        <div className={styles['addboard-content']}>
          <div className={styles.box}>
            <h3>*제목</h3>
            <Input
              name="name"
              addClassName={styles.inputTitle}
              placeholder="제목을 입력해주세요"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.box}>
            <h3>*내용</h3>
            <Input
              name="description"
              addClassName={`${styles.inputTitle} ${styles.inputLarge}`}
              placeholder="내용을 입력해주세요"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.box}>
            <h3>이미지</h3>
            <FileInput onChangeFile={onChangeFile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Addboard;
