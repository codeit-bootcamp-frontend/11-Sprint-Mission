import { useState } from 'react';
import styled from 'styled-components';

import { Container, Page } from '@/styles/Common.styles';
import { AddProdForm, AddProdTitle } from '../additem';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import InputFile from '@/components/shared/InputFile';

interface FormValues {
  boardName: string;
  boardDescription: string;
}

export default function AddBoard() {
  const [formValues, setFormValues] = useState<FormValues>({
    boardName: '',
    boardDescription: '',
  });

  const isFormValid =
    formValues.boardName.trim() !== '' && formValues.boardDescription.trim() !== '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <Page>
      <Container>
        <AddBoardForm>
          <AddBoardTitle>
            <h2>게시글 쓰기</h2>
            <Button color={isFormValid ? 'blue' : 'gray'} disabled={!isFormValid}>
              등록
            </Button>
          </AddBoardTitle>
          <div className='input-list'>
            <Input
              title='*제목'
              placeholder='제목을 입력해주세요'
              name='boardName'
              value={formValues.boardName}
              onChange={handleInputChange}
            />
            <Input
              title='*내용'
              as='textarea'
              placeholder='내용을 입력해주세요'
              name='boardDescription'
              value={formValues.boardDescription}
              onChange={handleInputChange}
              className='textarea'
            />
            <InputFile title='이미지' />
          </div>
        </AddBoardForm>
      </Container>
    </Page>
  );
}

const AddBoardForm = styled(AddProdForm)``;
const AddBoardTitle = styled(AddProdTitle)``;
