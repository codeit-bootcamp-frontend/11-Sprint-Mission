import { FormEvent } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/media.styles';

const ICON_SEARCH = '/ic_search.svg';

interface SearchInputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  wide?: boolean;
}

const SearchInput = ({ onSubmit, wide = false }: SearchInputProps) => {
  return (
    <StyledForm onSubmit={onSubmit} $wide={wide}>
      <input
        name='search'
        placeholder='검색할 상품을 입력해주세요'
        autoComplete='off'
      />
    </StyledForm>
  );
};

export default SearchInput;

type StyledFormProps = {
  $wide: boolean;
};

const StyledForm = styled.form<StyledFormProps>`
  width: ${({ $wide }) => ($wide ? '100%' : '32.5rem')};

  input {
    width: 100%;
    font-size: 1.6rem;
    line-height: 2.6rem;
    font-weight: 400;
    padding: 0.9rem 1.6rem 0.9rem 4.4rem;
    background-color: var(--gray-100);
    border-radius: 1.2rem;
    background-image: url(${ICON_SEARCH});
    background-size: 2.4rem;
    background-repeat: no-repeat;
    background-position: 1.6rem center;
  }
  input::placeholder {
    color: var(--gray-400);
  }

  ${media.ta`
    width: ${({ $wide }) => ($wide ? '100%' : '24.2rem')};
  `}

  ${media.mo`
    order: 3;
    width: ${({ $wide }) => ($wide ? '100%' : '28.8rem')};
  `}
`;
