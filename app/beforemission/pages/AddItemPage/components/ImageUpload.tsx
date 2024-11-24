import React, { ChangeEvent, useRef, useState } from "react";
import { ReactComponent as PlusImg } from "../../../images/icons/plusimg.svg";
import DeleteButton from "../../../components/DeleteButton";

interface ImageUploadProps {
  title: string;
}

function ImageUpload({ title }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInput = useRef<HTMLInputElement | null>(null);
  const inputId = "image-upload";

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (preview) {
      setErrorMessage("*이미지 등록은 최대 1개까지 가능합니다.");
    } else if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const prevUrl = URL.createObjectURL(file);
      setPreview(prevUrl);
      setErrorMessage("");
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  const handleImageDelete = () => {
    setPreview("");
    setErrorMessage("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  return (
    <div className="imgContainer">
      {title && (
        <label className="inputLabel" htmlFor={inputId}>
          {title}
        </label>
      )}
      <div className="prevImgLayout">
        <button className="imgButton" onClick={handleButtonClick}>
          <PlusImg />
          이미지등록
        </button>
        <input
          type="file"
          id={inputId}
          ref={fileInput}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        {preview && (
          <div className="imgContainergo">
            <img className="prevImg" src={preview} alt="이미지 미리보기" />
            <div className="imgDeleteButtonContainer">
              <DeleteButton onClick={handleImageDelete} />
            </div>
          </div>
        )}
      </div>
      {errorMessage && <p className="errorMsg">{errorMessage}</p>}
    </div>
  );
}

export default ImageUpload;
