import { ChangeEvent, useState } from 'react';

import {
  StyledInputContainer,
  StyledInput,
  StyledErrorText,
} from './Input.styles';

interface InputPropsBase {
  title?: string;
  isError?: boolean;
  errorMessage?: string;
}

// input용 props
interface InputPropsInput
  extends InputPropsBase,
    React.InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
  type?: string;
}

// textarea용 props
interface InputPropsTextarea
  extends InputPropsBase,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

// 구분 유니온 타입
type InputProps = InputPropsInput | InputPropsTextarea;

function Input({
  as = 'input',
  placeholder = '',
  name = '',
  title,
  isError = false,
  errorMessage = '에러가 발생 했습니다.',
  onChange,
  ...rest
}: InputProps) {
  const [value, setValue] = useState<string>('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  // `type` prop은 `as`가 'input'일 때만 전달
  const inputProps =
    as === 'input' ? { type: (rest as InputPropsInput).type } : {};

  return (
    <StyledInputContainer>
      {title && <h3>{title}</h3>}
      <div>
        <StyledInput
          as={as}
          placeholder={placeholder}
          name={name}
          value={value}
          $isError={isError}
          onChange={handleChange}
          {...inputProps}
          {...rest}
        />
        {isError && <StyledErrorText>{errorMessage}</StyledErrorText>}
      </div>
    </StyledInputContainer>
  );
}

export default Input;
