import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import plus from '../assets/icons/ic_plus.svg';
import './FileInput.css';
const style = { display: 'none' };

interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

const FileInput: FC<FileInputProps> = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputNode = inputRef.current;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files ? e.target.files[0] : null;
    onChange(name, nextValue);
  };

  const handleDeleteClick = () => {
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  const handleClick = () => {
    if (inputNode) {
      inputNode.click();
    }
  };

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      {value && (
        <button className="xButton" onClick={handleDeleteClick}>
          x
        </button>
      )}
      <div className="imageUpload">
        {preview ? (
          <img src={preview} alt="이미지 미리보기" className="previewImage" />
        ) : (
          <button className="imageUploadButton" onClick={handleClick}>
            <img src={plus} className="plus" alt="이미지 등록 아이콘" />
            <span className="imageUploadText">이미지 등록</span>
          </button>
        )}
        <input type="file" id="fileInput" accept="image/jpeg, image/png" onChange={handleChange} ref={inputRef} style={style} />
      </div>
    </div>
  );
};
export default FileInput;
