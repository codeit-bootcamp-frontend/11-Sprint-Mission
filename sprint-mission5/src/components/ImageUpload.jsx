import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import uploadIocn from "../images/uploadImg/upload_icon.png";
import uploadClose from "../images/uploadImg/upload_close.png";

function ImageUpload({ name, value, onChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    if (!nextValue) return;
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value || !(value instanceof Blob)) {
      setPreview(null);
      return;
    }
    const objectURL = URL.createObjectURL(value);
    setPreview(objectURL);

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [value]);

  return (
    <InputFlexWrap>
      <Label htmlFor="productImg">상품 이미지</Label>
      <HiddenInput
        id="productImg"
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      <PreviewFlexWrap>
        <CustomButton onClick={() => inputRef.current.click()}>
          <img src={uploadIocn} alt="업로드 아이콘" />
          <span>이미지 등록</span>
        </CustomButton>
        {preview && (
          <PrviewWrap>
            <PreviewImg src={preview} alt="이미지 미리보기" />

            <ClearButton onClick={handleClearClick}>
              <UploadClose src={uploadClose} alt="업로드 취소" />
            </ClearButton>
          </PrviewWrap>
        )}
      </PreviewFlexWrap>
      {preview && <Redtxt>* 이미지 등록은 최대 1개까지 가능합니다.</Redtxt>}
    </InputFlexWrap>
  );
}
const InputFlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const PreviewFlexWrap = styled.div`
  display: flex;
  gap: 24px;
`;

const Label = styled.label`
  font-size: 1.125rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const CustomButton = styled.button`
  padding: 10px 20px;
  background-color: var(--gray100);
  color: var(--gray400);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 282px;
  height: 282px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1279px) {
    width: 168px;
    height: 168px;
  }
`;
const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;
const ClearButton = styled.button`
  font-size: 2rem;
  font-weight: 700;
  position: absolute;
  top: 14px;
  right: 13px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: var(--gray400);
  color: var(--white);
  border-radius: 50%;
`;
const UploadClose = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const PrviewWrap = styled.div`
  width: 282px;
  height: 282px;
  position: relative;
  @media (max-width: 1279px) {
    width: 168px;
    height: 168px;
  }
`;
const Redtxt = styled.p`
  font-size: 1rem;
  color: var(--red);
`;
export default ImageUpload;
