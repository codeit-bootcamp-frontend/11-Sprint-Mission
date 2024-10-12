import React, { useEffect, useRef, useState } from "react";

const FileInput = ({ name, value, onChange }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
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
    <div className="file-input-area">
      <input
        type="file"
        id="fileInput"
        onChange={handleChange}
        className="file-input"
        name={name}
        ref={inputRef}
      />
      {preview && (
        <div className="file-input-preview">
          <img src={preview} className="preview-img" alt="이미지 미리보기" />
        </div>
      )}
    </div>
  );
};

export default FileInput;
