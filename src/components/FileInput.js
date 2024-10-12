import { useEffect, useRef, useState } from 'react';
import '../style/ProductCreateForm.css';
import { ReactComponent as PlusIcon } from '../images/ic_plus.svg';
import { ReactComponent as DeleteIcon } from '../images/ic_X.svg';

function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();
  const [isImageValid, setIsImageValid] = useState(false);

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
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
      <div className="image-input-form">
        <input
          id="file"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={inputRef}
          disabled={isImageValid}
        />
        <label htmlFor="file" className="filelabel">
          <PlusIcon />
          이미지 등록
        </label>
        {value && (
          <div className="preview-container">
            <img
              className="image-preview"
              src={preview}
              alt="이미지 미리보기"
            />
            <button className="image-delete-btn" onClick={handleClearClick}>
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      {isImageValid && (
        <div className="image-warning-message">
          *이미지 등록은 최대 1개까지 가능합니다.
        </div>
      )}
    </div>
  );
}

export default FileInput;
