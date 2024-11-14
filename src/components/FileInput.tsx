import { useEffect, useRef, useState } from "react";
import resetImg from "../assets/ic_X.svg";
import "./FileInput.css";
import plusIcon from "../assets/ic_plus.svg";

interface FileInputProps {
  className?: string;
  name: string;
  value: File | null;
  initialPreview?: string | null;
  onChange: (name: string, file: File | null) => void;
}

function FileInput({
  className = "",
  name,
  value,
  initialPreview = null,
  onChange,
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (value) {
        setErrorMessage("*이미지 등록은 최대 1개까지 가능합니다.");
        return;
      }
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      onChange(name, selectedFile);
      setErrorMessage("");
    }
  };

  const handleClearClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setPreview(null);
      onChange(name, null);
      setErrorMessage("");
    }
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (value) {
      e.preventDefault(); // 파일 선택 창이 열리지 않도록 방지
      setErrorMessage("*이미지 등록은 최대 1개까지 가능합니다.");
    }
  };

  useEffect(() => {
    if (value) {
      const previewUrl = URL.createObjectURL(value);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  return (
    <div className={`file-input ${className}`}>
      <div className="file-input-preview-container">
        <label className="file-input-label">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            onClick={handleUploadClick}
            ref={inputRef}
            className="file-input-hidden"
          />
          <div className="file-input-upload-text">
            <img
              className="file-input-upload-icon"
              src={plusIcon}
              alt="이미지 등록 아이콘"
            />
            이미지 등록
          </div>
        </label>
        {value && (
          <div className="file-input-preview-selected">
            <img
              className="file-input-preview"
              src={preview || ""}
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
      {errorMessage && (
        <div className="file-input-error-message">{errorMessage}</div>
      )}
    </div>
  );
}

export default FileInput;
