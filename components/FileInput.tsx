import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from '@styles/FileInput.module.css';
import PlusIcon from '@public/svgs/ic_plus.svg';
import DeleteIcon from '@public/svgs/ic_X.svg';

interface FileInputProps {
  name: string;
  value: File | null;
  initialPreview: string | null;
  onChange: (name: string, value: File | null) => void;
}

function FileInput({ name, value, initialPreview, onChange }: FileInputProps) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isImageValid, setIsImageValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const nextValue = fileList[0];
    onChange(name, nextValue);
    setIsImageValid(true);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);

    setIsImageValid(false);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div>
      <div className={styles['image-input-form']}>
        <input
          id="file"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={inputRef}
          disabled={isImageValid}
          style={{ display: 'none' }}
        />
        <label htmlFor="file" className={styles['filelabel']}>
          <PlusIcon />
          이미지 등록
        </label>
        {value && (
          <div className={styles['preview-container']}>
            <img
              className={styles['image-preview']}
              src={preview || ''}
              alt="이미지 미리보기"
            />
            <button
              className={styles['image-delete-btn']}
              onClick={handleClearClick}
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      {isImageValid && (
        <div className={styles['image-warning-message']}>
          *이미지 등록은 최대 1개까지 가능합니다.
        </div>
      )}
    </div>
  );
}

export default FileInput;
