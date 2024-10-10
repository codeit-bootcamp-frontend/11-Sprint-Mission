import { useEffect, useRef, useState } from 'react';
import '../style/ProductCreateForm.css';
import { ReactComponent as PlusIcon } from '../images/ic_plus.svg';
import { ReactComponent as DeleteIcon } from '../images/ic_X.svg';

function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
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
    <div className="image-input-form">
      <input
        id="file"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      <label htmlFor="file" className="filelabel">
        <PlusIcon />
        이미지 등록
      </label>
      {value && (
        <div className="preview-container">
          <img className="image-preview" src={preview} alt="이미지 미리보기" />
          <button className="image-delete-btn" onClick={handleClearClick}>
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default FileInput;
