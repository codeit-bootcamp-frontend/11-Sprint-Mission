import React, { useRef, useState, useEffect } from 'react';
import styles from '../../styles/additem/additem.module.css';

interface ImageUploadProps {
  name: string;
  value: File | null;
  onChange: (name: string, file: File | null) => void;
}

const ImageUpload = ({ name, value, onChange }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | undefined>();
  const [message, setMessage] = useState<string>(''); // 메시지 상태 관리
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files ? e.target.files[0] : null;
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
    setMessage('');
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(undefined);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (preview) {
      e.preventDefault();
      setMessage('*이미지 등록은 최대 1개까지 가능합니다.');
    }
  };

  return (
    <div>
      <div className={styles.imageUploadContainer}>
        <div className={styles.customFileInput}>
          <label
            htmlFor="fileUpload"
            className={styles.uploadBox}
            onClick={handleLabelClick} // 라벨 클릭 이벤트 추가
          >
            <div className={styles.uploadBoxContent}>
              <p className={styles.textArea}>
                <span className={styles.plus}>+</span>
                <br /> 이미지 등록
              </p>
            </div>
          </label>
          <input
            id="fileUpload"
            className={styles.imageUploadInput}
            type="file"
            accept="image/png, image/jpeg"
            ref={inputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>

        {preview && (
          <div className={styles.imagePreviewContainer}>
            <img
              src={preview}
              alt="미리보기 이미지"
              className={styles.imagePreview}
            />
            <button className={styles.clearButton} onClick={handleClearClick}>
              X
            </button>
          </div>
        )}
      </div>
      {message && <p className={styles.errorMessage}>{message}</p>}
    </div>
  );
};

export default ImageUpload;
