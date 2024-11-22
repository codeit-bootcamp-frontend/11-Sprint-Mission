import ImageUpload from "../components/ImageUpload";
import ProductName from "../components/ProductName";
import ProductDescription from "../components/ProductDescription";
import ProductPrice from "../components/ProductPrice";
import TagBar from "../components/TagBar";
import { HelmetProvider, Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Additem() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const handleImageChange = (name: string, value: string | Blob | null) => {
    if (value instanceof Blob) {
      setImageFile(value as File); // Blob을 File로 캐스팅
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsSubmitDisabled(
      !productName || !productDescription || !productPrice || tags.length === 0
    );
  }, [productName, productDescription, productPrice, tags]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>상품등록</title>
        </Helmet>
        <AddContainer>
          <form onSubmit={handleSubmit}>
            <AddRegisterWrap>
              <Title>상품 등록하기</Title>
              <SubmitButton type="submit" disabled={isSubmitDisabled}>
                등록
              </SubmitButton>
            </AddRegisterWrap>
            <FlexGapWrap>
              <ImageUpload
                name="productImage"
                value={imageFile}
                onChange={handleImageChange}
              />
              <ProductName value={productName} onChange={setProductName} />
              <ProductDescription
                value={productDescription}
                onChange={setProductDescription}
              />
              <ProductPrice value={productPrice} onChange={setProductPrice} />
              <TagBar value={tags} onChange={setTags} />
            </FlexGapWrap>
          </form>
        </AddContainer>
      </HelmetProvider>
    </>
  );
}
const AddContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 70px;
  @media (min-width: 768px) and (max-width: 1279px) {
    padding: 0px 24px;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    padding: 0px 14px;
  }
`;
const AddRegisterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
`;
const SubmitButton = styled.button`
  width: 74px;
  height: 42px;
  border-radius: 8px;
  background-color: var(--skyblue);
  color: var(--white);

  &:disabled {
    background-color: var(--gray400);
    cursor: not-allowed;
  }
`;
const FlexGapWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default Additem;
