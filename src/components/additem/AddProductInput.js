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
  onTagsUpdate,
}) {
  const [tags, setTags] = useState([]);

  const handleTagSubmit = () => {
    if (productTag.trim() !== '') {
      const updatedTags = [...tags, productTag.trim()];
      setTags(updatedTags);
      onTagChange(''); // Clear input
      onTagsUpdate(updatedTags); // 부모 컴포넌트로 태그 배열 전달
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
      <p className="cantainerTitle">상품명</p>
      <input
        className="addProductInput"
        value={productName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="상품명을 입력해주세요"
      />
      <p className="cantainerTitle">상품 소개</p>
      <textarea
        className="productContentInput"
        value={productContent}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="상품 소개를 입력해주세요"
      />
      <p className="cantainerTitle">판매가격</p>
      <input
        className="addProductInput"
        type="number"
        value={productPrice}
        onChange={(e) => onPriceChange(e.target.value)}
        placeholder="판매 가격을 입력해주세요"
      />
      <p className="cantainerTitle">태그</p>
      <input
        className="addProductInput"
        value={productTag}
        onChange={(e) => onTagChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="태그를 입력해주세요"
      />

      <div>
        {tags.map((tag, index) => (
          <p className="tagOutput" key={index}>
            #{tag}{' '}
            <button type="button" onClick={() => handleTagDelete(index)}>
              X
            </button>
          </p>
        ))}
      </div>
    </form>
  );
}

export default AddProductInput;
