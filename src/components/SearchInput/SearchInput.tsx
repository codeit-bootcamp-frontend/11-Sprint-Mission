import { FormEvent } from 'react';
import StyledForm from './SearchInput.styles';

interface SearchInputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchInput = ({ onSubmit }: SearchInputProps) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <input
        name='search'
        placeholder='검색할 상품을 입력해주세요'
        autoComplete='off'
      />
    </StyledForm>
  );
};

export default SearchInput;
