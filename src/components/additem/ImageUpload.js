import { useRef, useState, useEffect } from 'react';
import '../../styles/additem/ImageUpload.css';

function ImageUpload({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef(null);

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
    <div className="imageUploadContainer">
      <div className="customFileInput">
        <label for="fileUpload" className="uploadBox">
          <div className="uploadBoxContent">
            <p className="textArea">
              <span className="plus">+</span>
              <br /> 이미지 등록
            </p>
          </div>
        </label>
        <input
          id="fileUpload"
          className="imageUploadInput"
          type="file"
          accept="image/png, image/jpeg"
          ref={inputRef}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>

      {preview && (
        <div className="imagePreviewContainer">
          <img src={preview} alt="미리보기 이미지" className="imagePreview" />
          <button className="clearButton" onClick={handleClearClick}>
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
