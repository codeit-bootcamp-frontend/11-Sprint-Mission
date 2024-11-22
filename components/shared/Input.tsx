import styled from 'styled-components';
import font from '@/styles/fontStyle.styles';
import { flexColumn } from '@/styles/layout.styles';

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
  value,
  isError = false,
  errorMessage = '에러가 발생 했습니다.',
  onChange,
  ...rest
}: InputProps) {
  // `type` prop은 `as`가 'input'일 때만 전달
  const inputProps =
    as === 'input' ? { type: (rest as InputPropsInput).type } : {};

  return (
    <StyledInputContainer>
      {title && <h3>{title}</h3>}
      <div>
        <StyledInput
          as={as as React.ElementType}
          placeholder={placeholder}
          name={name}
          value={value}
          $isError={isError}
          onChange={onChange}
          {...inputProps}
          {...rest}
        />
        {isError && <StyledErrorText>{errorMessage}</StyledErrorText>}
      </div>
    </StyledInputContainer>
  );
}

export default Input;

interface StyledInputProps {
  $isError?: boolean;
}

const StyledInputContainer = styled.div`
  ${flexColumn}
  gap: 1.6rem;
  width: 100%;
  h3 {
    ${font('18b')}
  }
`;

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border-radius: 1.2rem;
  background-color: var(--gray-100);
  padding: 1.6rem 2.4rem 1.4rem;
  border: 1px solid;
  border-color: ${({ $isError }) => ($isError ? 'var(--red)' : 'transparent')};
  resize: none;
  ${font('16')}
  &::placeholder {
    color: var(--gray-400);
  }
  &:focus {
    outline: none;
    border-color: ${({ $isError }) =>
      $isError ? 'var(--red)' : 'var(--blue-300)'};
  }
`;

const StyledErrorText = styled.p`
  ${font('14sb')}
  color: var(--red);
  padding: 0.8rem 0 0 1.6rem;
`;
