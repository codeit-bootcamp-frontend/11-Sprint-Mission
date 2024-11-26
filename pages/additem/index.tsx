import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';

import { flexColumn } from '@/styles/layout.styles';
import font from '@/styles/fontStyle.styles';

import Button from '@/components/shared/Button';
import TagsList from '@/components/shared/Tags/TagsList';
import { Container, Page } from '@/styles/Common.styles';
import InputFile from '@/components/shared/InputFile';
import Input from '@/components/shared/Input';

interface FormValues {
  productName: string;
  productDescription: string;
  productPrice: string;
  productTags: string[];
}

function AddProd() {
  const [formValues, setFormValues] = useState<FormValues>({
    productName: '',
    productDescription: '',
    productPrice: '',
    productTags: [],
  });
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const isFormValid =
    formValues.productName.trim() !== '' &&
    formValues.productDescription.trim() !== '' &&
    formValues.productPrice.trim() !== '' &&
    formValues.productTags.length > 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'productTags') {
      setTagInputValue(value);
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleAddTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
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

  const handleRemoveTag = (tagRemove: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      productTags: prevValues.productTags.filter((tag) => tag !== tagRemove),
    }));
  };

  return (
    <Page>
      <Container>
        <AddProdForm>
          <AddProdTitle>
            <h2>상품 등록하기</h2>
            <Button color={isFormValid ? 'blue' : 'gray'} disabled={!isFormValid}>
              등록
            </Button>
          </AddProdTitle>
          <div className='input-list'>
            <InputFile title='상품등록' />
            <Input
              title='상품명'
              placeholder='상품명을 입력해주세요'
              name='productName'
              value={formValues.productName}
              onChange={handleInputChange}
            />
            <Input
              title='상품소개'
              as='textarea'
              placeholder='상품 소개를 입력해주세요'
              name='productDescription'
              value={formValues.productDescription}
              onChange={handleInputChange}
            />
            <Input
              type='number'
              title='판매가격'
              placeholder='판매 가격을 입력해주세요'
              name='productPrice'
              value={formValues.productPrice}
              onChange={handleInputChange}
            />
            <div className='input-tag'>
              <Input
                title='태그'
                placeholder='태그를 입력해주세요'
                name='productTags'
                value={tagInputValue}
                onChange={handleInputChange}
                onKeyDown={handleAddTagInput}
              />
              {formValues.productTags.length > 0 && (
                <TagsList tags={formValues.productTags} onRemove={handleRemoveTag} />
              )}
            </div>
          </div>
        </AddProdForm>
      </Container>
    </Page>
  );
}

export default AddProd;

const AddProdForm = styled.form`
  ${flexColumn}
  gap: 2.4rem;
  .input {
    &-list {
      ${flexColumn}
      gap: 3.2rem;
    }

    &-tag {
      ${flexColumn}
      gap: 1.4rem;
    }
  }
`;

const AddProdTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    ${font('20b')}
  }
`;
