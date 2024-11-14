import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../assets/images/icons/ic_add.svg";
import { ReactComponent as DelIcon } from "../../../assets/images/icons/ic_del.svg";


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

const UploadLabel = styled.label`
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

const HiddenFileInput = styled.input`
  display: none;
`

const ImgPreview = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative;
  width: 282px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
`;

const DeleteBtnSection = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

const DeleteBtn = styled.button`
  background-color: #9CA3AF;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ImgUpload({ title }) {
  const [imgPreviewUrl, setImgPreviewUrl] = useState("");

  const handleImgChange = (e) => {
    const file= e.target.files[0];

    if(file) {
      const imgUrl = URL.createObjectURL(file);
      setImgPreviewUrl(imgUrl);
    }
  }

  const handleDelete = () => {
    setImgPreviewUrl(""); // 미리보기 URL 리셋
  };

	return (
		<div>
			{title && <Label>{title}</Label>}
      <ImgUploadContainer>
        <UploadLabel htmlFor="img-upload">
          <AddIcon />
          이미지 등록
        </UploadLabel>

        <HiddenFileInput
          id="img-upload"
          type="file"
          onChange={handleImgChange}
          accept="image/*"
        />

        {imgPreviewUrl && (
          <ImgPreview src={imgPreviewUrl}>
            <DeleteBtnSection>
              <DeleteBtn onClick={handleDelete} label="이미지 파일">
                <DelIcon />
              </DeleteBtn>
            </DeleteBtnSection>
          </ImgPreview>
        )}
      </ImgUploadContainer>

      
		</div>
	);
}

export default ImgUpload;