// import './Input.scss';
import { useState } from 'react';
import {
  StyledInputContainer,
  StyledInput,
  StyledErrorText,
} from './Input.styles';

function Input(
  {
    as = 'input',
    type = 'text',
    placeholder = '',
    name = '',
    title,
    isError = false,
    errorMessage = '에러가 발생 했습니다.',
    onChange,
    ...rest
  },
  ref,
) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <StyledInputContainer>
      {title && <h3>{title}</h3>}
      <div>
        <StyledInput
          as={as}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          isError={isError}
          onChange={onChange ? onChange : handleChange}
          {...rest}
        />
        {isError && <StyledErrorText>{errorMessage}</StyledErrorText>}
      </div>
    </StyledInputContainer>
  );
}

export default Input;
