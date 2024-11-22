import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';
import { flexColumn } from '@/styles/layout.styles';

import { StyledInput } from '../Input';
import Button from '../Button';

function ComentPost({ title = '문의하기', placeholder = '댓글달기' }) {
  const [formValues, setFormValues] = useState('');

  const isFormValid = formValues.trim() !== '';

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormValues(value);
  };

  return (
    <ComentPostForm>
      <ComentPostTitle>{title}</ComentPostTitle>
      <StyledPostInputContainer
        as='textarea'
        placeholder={placeholder}
        onChange={handleInputChange}
        value={formValues}
      />
      <ComentButton
        color={!isFormValid ? 'gray' : 'blue'}
        disabled={!isFormValid}>
        등록
      </ComentButton>
    </ComentPostForm>
  );
}

export default ComentPost;

const ComentPostForm = styled.form`
  ${flexColumn}
  align-items: flex-end;
  width: 100%;
`;

const StyledPostInputContainer = styled(StyledInput)`
  height: 10.4rem;
  ${media.mo`
  height: 12.9rem;
  ${font('14')}
  `}
`;

const ComentButton = styled(Button)`
  margin-top: 1.6rem;
`;

const ComentPostTitle = styled.h3`
  width: 100%;
  ${font('16sb')}
  margin-bottom: 0.9rem;
`;
