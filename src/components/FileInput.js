import { useEffect, useRef, useState } from "react";
import placeholderImg from "../assets/placeholder_img.png";
import resetImg from "../assets/ic_X.svg";
import "./FileInput.css";

function FileInput({ className = "", name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview || placeholderImg);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      onChange(name, selectedFile);
      setErrorMessage("");
      setIsImageUploaded(true);
    }
  };

  const handleClearClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setPreview(placeholderImg);
      onChange(name, null);
      setErrorMessage("");
      setIsImageUploaded(false);
    }
  };

  const handleImageClick = () => {
    if (value) {
      // 이미 이미지가 등록된 상태면 경고 메시지 표시
      setErrorMessage("*이미지 등록은 최대 1개까지 가능합니다.");
    } else if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (value) {
      const previewUrl = URL.createObjectURL(value);
      setPreview(previewUrl);
      setIsImageUploaded(true);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreview(placeholderImg);
      setIsImageUploaded(false);
    }
  }, [value]);

  return (
    <div className={`"file-input" ${className}`}>
      <div className="file-input-preview-container">
        <div className="file-input-upload-container" onClick={handleImageClick}>
          <img
            className="file-input-upload-placeholder"
            src={placeholderImg}
            alt="이미지 등록"
          />
        </div>
        {isImageUploaded && (
          <div className="file-input-preview-selected">
            <img
              className="file-input-preview"
              src={preview}
              alt="이미지 미리보기"
            />
            <button
              type="button"
              className="file-input-clear-button"
              onClick={handleClearClick}
            >
              <img src={resetImg} alt="선택 해제" />
            </button>
          </div>
        )}
      </div>
      <input
        className="file-input-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={inputRef}
      />
      {errorMessage && (
        <div className="file-input-error-message">{errorMessage}</div>
      )}
    </div>
  );
}

export default FileInput;
