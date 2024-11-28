import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import plus from '@/public/ic_plus.svg';

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();
  const inputNode = inputRef.current;
  const invisible = { display: 'none' };

  const handleChange = e => {
    const nextValue = e.target.files[0];
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
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      {value && (
        <button onClick={handleDeleteClick} className="xButton">
          x
        </button>
      )}
      <div className="imageUpload">
        {preview ? (
          <Image width={282} height={282} src={preview} alt="이미지 미리보기" className="previewImage" />
        ) : (
          <button className="imageUploadButton" onClick={handleClick}>
            <Image width={48} height={48} src={plus} className="plus" alt="이미지 등록 아이콘" />
            <span className="imageUploadText">이미지 등록</span>
          </button>
        )}
        <input type="file" id="fileInput" accept="image/jpeg, image/png" onChange={handleChange} ref={inputRef} style={invisible} />
      </div>
    </div>
  );
}
export default FileInput;
