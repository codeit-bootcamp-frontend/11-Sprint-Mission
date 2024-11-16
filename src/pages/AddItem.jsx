import React, { useState } from 'react';
import styles from './AddItem.module.scss';
// import HeadingTitleArea from '../components/common/HeadingTitleArea';
import Button from '../components//Button/Button';
import Input from '../components/Input/Input';
import InputFile from '../components/common/InputFile';
import TagsList from '../components/common/TagsList';

function AddItem() {
  const [formValues, setFormValues] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productTags: [],
  });
  const [tagInputValue, setTagInputValue] = useState('');

  const isFormValid =
    formValues.productName.trim() !== '' &&
    formValues.productDescription.trim() !== '' &&
    formValues.productPrice.trim() !== '' &&
    formValues.productTags.length > 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productTags') {
      setTagInputValue(value);
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleAddTagInput = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      if (
        // 빈값이 아닐 때 & 배열에 없는 태그 일 경우
        tagInputValue.trim() !== '' &&
        !formValues.productTags.includes(tagInputValue.trim())
      ) {
        setFormValues((prevValues) => ({
          ...prevValues,
          productTags: [...prevValues.productTags, tagInputValue],
        }));
        setTagInputValue('');
      }
    }
  };

  const handleRemoveTag = (tagRemove) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      productTags: prevValues.productTags.filter((tag) => tag !== tagRemove),
    }));
  };

  return (
    <main className='page-addItem'>
      <div className='container'>
        <form>
          <h2>상품 등록하기</h2>
          <Button
            className='post'
            color={!isFormValid ? 'gray' : 'blue'}
            disabled={!isFormValid && formValues.length > 0}>
            등록
          </Button>
          <div className={styles['input-text-area']}>
            <div>
              <h3>상품이미지</h3>
              <InputFile />
            </div>
            <div>
              <h3>상품명</h3>
              <Input
                placeholder='상품명을 입력해주세요'
                name='productName'
                value={formValues.productName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>상품소개</h3>
              <textarea
                className='default'
                name='productDescription'
                placeholder='상품 소개를 입력해주세요'
                value={formValues.productDescription}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>판매가격</h3>
              <Input
                type='number'
                placeholder='판매 가격을 입력해주세요'
                name='productPrice'
                value={formValues.productPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>태그</h3>
              <div className={styles['input-tag-area']}>
                <Input
                  placeholder='태그를 입력해주세요'
                  name='productTags'
                  value={tagInputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleAddTagInput}
                />
                {!formValues.productTags.length && (
                  <TagsList
                    tags={formValues.productTags}
                    onRemove={handleRemoveTag}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddItem;
