import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../assets/images/icons/ic_add.svg";

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ImgUploadContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;

const UploadBtn = styled.button`
  background-color:#F3F4F6;
  color: #9CA3AF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  width: 282px;
  aspect-ratio: 1 / 1; // 정사각형
  border-radius: 12px;

  &:hover {
    background-color: #F9FAFB;
  }
`;

function InputImg({ title }) {
	return (
		<div>
			{title && <Label>{title}</Label>}
      <ImgUploadContainer>
        <UploadBtn>
          <AddIcon />
          이미지 등록
        </UploadBtn>
      </ImgUploadContainer>
		</div>
	);
}

export default InputImg;