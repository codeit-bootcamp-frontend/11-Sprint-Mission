import React, { useState } from 'react';

interface AddProductInputProps {
  productName: string;
  productContent: string;
  productPrice: string;
  productTag: string;
  onNameChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onTagsUpdate: (tags: string[]) => void;
}

const AddProductInput = ({
  productName,
  productContent,
  productPrice,
  productTag,
  onNameChange,
  onContentChange,
  onPriceChange,
  onTagChange,
  onTagsUpdate,
}: AddProductInputProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleTagSubmit = () => {
    if (productTag.trim() !== '') {
      const updatedTags = [...tags, productTag.trim()];
      setTags(updatedTags);
      onTagChange('');
      onTagsUpdate(updatedTags);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      handleTagSubmit();
    }
  };

  const handleTagDelete = (indexToDelete: number) => {
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
};

export default AddProductInput;
