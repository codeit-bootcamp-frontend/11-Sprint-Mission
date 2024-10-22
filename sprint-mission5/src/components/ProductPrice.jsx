import { useEffect, useState } from "react";
import styled from "styled-components";

function ProductPrice({ value, onChange }) {
  const [price, setPrice] = useState("");

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPrice(inputValue);
    setPrice(formattedValue);
    onChange(formattedValue);
  };

  useEffect(() => {
    setPrice(value);
  }, [value]);

  return (
    <InputFlexWrap>
      <Label htmlFor="price">판매가격</Label>
      <PriceInput
        id="price"
        type="text"
        value={price}
        onChange={handleChange}
        placeholder="판매 가격을 입력해주세요."
      />
    </InputFlexWrap>
  );
}

const InputFlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Label = styled.label`
  font-size: 1.125rem;
`;
const PriceInput = styled.input`
  padding-left: 24px;
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: none;
  background-color: var(--gray100);

  &::placeholder {
    color: var(--gray400);
  }
`;
export default ProductPrice;
