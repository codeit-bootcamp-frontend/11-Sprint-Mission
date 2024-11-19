import { ChangeEvent, useState } from 'react';

// import Input from '../Input/Input';

import {
  ComentPostForm,
  ComentPostTitle,
  StyledPostInputContainer,
  ComentButton,
} from './ComentPost.styles';

function ComentPost({ title = '문의하기', placeholder = '댓글달기' }) {
  const [formValues, setFormValues] = useState('');

  const isFormValid = formValues.trim() !== '';

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
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
