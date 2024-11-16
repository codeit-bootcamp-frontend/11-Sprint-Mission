import { useEffect, useState } from "react";
import styled from "styled-components";

interface ProductDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

function ProductDescription({ value, onChange }: ProductDescriptionProps) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <TextAreaFlexWrap>
      <Label htmlFor="description">상품 소개</Label>
      <TextAreaInput
        id="description"
        value={text}
        onChange={handleChange}
        placeholder="상품 소개를 입력해주세요."
      />
    </TextAreaFlexWrap>
  );
}
const TextAreaFlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Label = styled.label`
  font-size: 1.125rem;
`;
const TextAreaInput = styled.textarea`
  padding-top: 24px;
  padding-left: 24px;
  width: 100%;
  height: 282px;
  border-radius: 12px;
  border: none;
  background-color: var(--gray100);
  font-family: "Pretendard-Regular";

  &::placeholder {
    color: var(--gray400);
  }
`;
export default ProductDescription;
