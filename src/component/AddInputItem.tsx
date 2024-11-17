import React, { useState } from "react";
import DeleteButton from "./DeleteButton";

function AddInputItem({
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
  const [tags, setTags] = useState<any[]>([]); // 제네릭, 함수에서 인자를 받는 것처럼 타입도 인자로 받기

  const handleTagSubmit = () => {
    if (productTag.trim() !== "") {
      const updatedTags = [...tags, productTag.trim()];
      setTags(updatedTags);
      onTagChange(""); // Clear input
      onTagsUpdate(updatedTags); // 부모 컴포넌트로 태그 배열 전달
    }
  };

  const handleTagDelete = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onTagsUpdate(updatedTags); // 변경된 태그 배열을 부모 컴포넌트에 전달
  };

  const handleKeyPress = (e) => {
    if (e.key === " " || e.key === "," || e.key === "Enter") {
      e.preventDefault();
      handleTagSubmit();
    }
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
      <textarea
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
        {tags.map((tag, index) => (
          <p className="tagOutput" key={index}>
            #{tag}{" "}
            <DeleteButton
              label="삭제"
              onClick={() => handleTagDelete(index)} /*삭제 핸들러 전달*/
            />
          </p>
        ))}
      </div>
    </form>
  );
}

export default AddInputItem;
