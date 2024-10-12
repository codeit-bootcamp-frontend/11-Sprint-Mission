import { useEffect, useRef, useState } from 'react';

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
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
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <div className="fileInput">
        <div className="image">
          {preview && (
            <img className="imagePreview" src={preview} alt="이미지 미리보기" />
          )}
          {preview && (
            <button type="button" onClick={handleClearClick}>
              ×
            </button>
          )}
        </div>
        <label className="imageLabel" htmlFor="images">
          <span>+</span>
          <span>이미지 등록</span>
        </label>
        <input id="images" type="file" onChange={handleChange} ref={inputRef} />
      </div>
    </div>
  );
}

export default FileInput;
