import { useEffect, useState } from "react";
import styled from "styled-components";

interface ProductNameProps {
  value: string;
  onChange: (value: string) => void;
}

function ProductName({ value, onChange }: ProductNameProps) {
  const [productname, setProductname] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductname(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setProductname(value);
  }, [value]);

  return (
    <InputFlexWrap>
      <Label htmlFor="pName">상품명</Label>
      <NameInput
        id="pName"
        type="text"
        value={productname}
        onChange={handleChange}
        placeholder="상품명을 입력해주세요"
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
const NameInput = styled.input`
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
export default ProductName;
