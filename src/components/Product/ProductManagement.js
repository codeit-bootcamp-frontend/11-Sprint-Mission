import Button from "../Button";
import DropDown from "../DropDown";
import SearchInput from "../SearchInput";

const ProductManagement = ({ onSubmit, onBest, onNewest }) => {
  const options = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "favorite" },
  ];
  const handleSelect = (value) => {
    if (value === "recent") {
      onNewest();
    } else if (value === "favorite") {
      onBest();
    }
  };
  return (
    <>
      <SearchInput onSubmit={onSubmit} />
      <Button link={true} href='/additem' className='additem' styleType='square blue'>
        상품 등록하기
      </Button>
      <DropDown options={options} onSelect={handleSelect} />
    </>
  );
};

export default ProductManagement;
