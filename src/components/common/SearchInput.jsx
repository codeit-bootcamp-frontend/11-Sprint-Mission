import "./SearchInput.scss";

const SearchInput = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='input-search-wrap'>
      <input
        className='input-search'
        name='search'
        placeholder='검색할 상품을 입력해주세요'
        autoComplete='off'
      />
    </form>
  );
};

export default SearchInput;
