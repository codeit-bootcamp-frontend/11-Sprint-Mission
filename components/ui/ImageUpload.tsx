import React, { useRef, useState } from "react";
// import { useEffect } from "react";
import PlusIcon from "../public/images/ic_plus.svg";
import DeleteButton from "./DeleteButton";
import Image from "next/image";

interface ImageUploadProps {
  title: string; // 'title' Prop이 필수
}

const ImageUpload = ({ title }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  // const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  // const handleChange = (e) => {
  //   const nextValue = e.target.files[0];
  //   onChange(name, nextValue);
  // };

  // useEffect(() => {
  //   if (!value) return;

  //   const nextPreview = URL.createObjectURL(value);
  //   setPreview(nextPreview);

  //   return () => {
  //     setPreview();
  //     URL.revokeObjectURL(nextPreview);
  //   };
  // }, [value]);

  // const handleLabelClick = (e) => {
  //   if (preview) {
  //     setMessage("*이미지 등록은 최대 1개까지 가능합니다.");
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null; // 파일이 있을 경우 처리, 조건부 연산자로 존재 여부 확인
    if (file) {
      // 미리보기 주소 값(Object URL) 생성
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleDelete = () => {
    setPreview(""); // 미리보기 URL 리셋
  };

  return (
    <div>
      <div className="imageUploadContainer">
        <div className="customFileInput">
          <label
            htmlFor="fileUpload"
            className="uploadBox"
            // onClick={handleLabelClick}
          >
            <div className="uploadBoxContent">
              <p className="textArea">
                <Image src={PlusIcon} alt="Plus" width={24} height={24} />
                <br /> 이미지 등록
              </p>
            </div>
          </label>
          <input
            id="fileUpload"
            className="imageUploadInput"
            type="file"
            accept="image/png, image/jpeg"
            ref={inputRef}
            onChange={handleChange}
            style={{ display: "none" }}
            disabled={!!preview}
          />
        </div>

        {preview && (
          <div className="imagePreviewContainer">
            <Image
              src={preview}
              alt="미리보기 이미지"
              className="imagePreview"
            />
            <DeleteButton onClick={handleDelete} label="이미지 파일" />
          </div>
        )}
      </div>
      {/* {message && <p className="errorMessage">{message}</p>} */}
    </div>
  );
};

export default ImageUpload;
