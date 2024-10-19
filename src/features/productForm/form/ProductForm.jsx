import InputField from "../../../shared/ui/inputFiled/InputFiled";
const ProductForm = ({
  name,
  description,
  price,
  tag,
  onNameChange,
  onDescriptionChange,
  onPriceChange,
  onTagChange,
  onKeyDown,
}) => {
  return (
    <>
      <InputField
        label="상품명"
        value={name}
        onChange={onNameChange}
        placeholder="상품명을 입력해주세요"
      />
      <div className="flex flex-col gap-y-2">
        <label htmlFor="textarea">상품 소개</label>
        <textarea
          className="w-full h-96 py-5 px-5 bg-slate-200 border rounded-lg text-sm"
          placeholder="상품 소개를 입력해주세요"
          value={description}
          onChange={onDescriptionChange}
          id="textarea"
        ></textarea>
      </div>
      <InputField
        label="판매가격"
        type="number"
        value={price}
        onChange={onPriceChange}
        placeholder="판매 가격을 입력해주세요"
      />
      <InputField
        label="태그"
        value={tag}
        onChange={onTagChange}
        placeholder="태그를 입력해주세요"
        onKeyDown={onKeyDown} // 태그 입력 처리
      />
    </>
  );
};

export default ProductForm;
