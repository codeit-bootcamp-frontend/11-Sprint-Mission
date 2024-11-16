import StyledForm from './SearchInput.styles';

const SearchInput = ({ onSubmit }) => {
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
