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
        placeholder="태그를 입력해주세요"
      />
    </form>
  );
}

export default AddProductInput;
