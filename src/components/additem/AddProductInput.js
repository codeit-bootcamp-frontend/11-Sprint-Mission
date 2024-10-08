import { useState } from 'react';

function AddProductInput({
  productName,
  productContent,
  productPrice,
  productTag,
  onNameChange,
  onContentChange,
  onPriceChange,
  onTagChange,
}) {
  const [tags, setTags] = useState([]);

  const handleTagSubmit = () => {
    if (productTag.trim() !== '') {
      setTags([...tags, productTag.trim()]);
      onTagChange('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      handleTagSubmit();
    }
  };

  const handleTagDelete = (indexToDelete) => {
    setTags(tags.filter((_, index) => index !== indexToDelete));
  };

  return (
    <form>
      <p>상품명</p>
      <input
        value={productName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="상품명을 입력해주세요"
      />
      <p>상품 소개</p>
      <input
        value={productContent}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="상품 소개를 입력해주세요"
      />
      <p>판매가격</p>
      <input
        type="number"
        value={productPrice}
        onChange={(e) => onPriceChange(e.target.value)}
        placeholder="판매 가격을 입력해주세요"
      />
      <p>태그</p>
      <input
        value={productTag}
        onChange={(e) => onTagChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="태그를 입력해주세요"
      />

      <div>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              {tag}{' '}
              <button type="button" onClick={() => handleTagDelete(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default AddProductInput;
