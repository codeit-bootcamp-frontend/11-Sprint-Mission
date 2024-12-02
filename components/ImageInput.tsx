import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/addboard.module.css";
import resetImg from "@/public/svgs/ic_X.svg";
import plusIcon from "@/public/svgs/ic_plus.svg";
import { ImageInputProps } from "@/types/commontypes";

export default function ImageInput({
  className = "",
  name,
  value,
  initialPreview = null,
  onChange,
}: ImageInputProps) {
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
      e.preventDefault();
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
    <div className={`${styles.file_input} ${className}`}>
      <div className={styles.file_input_preview_container}>
        <label className={styles.file_input_label}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            onClick={handleUploadClick}
            ref={inputRef}
            className={styles.file_input_hidden}
          />
          <div className={styles.file_input_upload_text}>
            <Image
              className={styles.file_input_upload_icon}
              src={plusIcon}
              alt="이미지 등록 아이콘"
              width={24}
              height={24}
            />
            이미지 등록
          </div>
        </label>
        {preview && (
          <div className={styles.file_input_preview_selected}>
            <Image
              className={styles.file_input_preview}
              src={preview}
              alt="이미지 미리보기"
              width={100}
              height={100}
            />
            <button
              type="button"
              className={styles.file_input_clear_button}
              onClick={handleClearClick}
            >
              <Image src={resetImg} alt="선택 해제" width={24} height={24} />
            </button>
          </div>
        )}
      </div>
      {errorMessage && (
        <div className={styles.file_input_error_message}>{errorMessage}</div>
      )}
    </div>
  );
}
