import style from "../css/fileInput.module.css";
import addImageIcon from "../img/add_image.png";
import iconX from "../img/ic_X.png";
import React, { useEffect, useRef, useState } from "react";
function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
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

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={style.fileInputSection}>
      <input
        className={style.fileInput}
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
        onChange={handleChange}
      />
      <button className={style.uploadButton} onClick={handleButtonClick}>
        <img
          className={style.uploadIcon}
          src={addImageIcon}
          alt="이미지 등록"
        />{" "}
      </button>
      {preview && (
        <div className={style.previewContainer}>
          <img
            className={style.previewImg}
            src={preview}
            alt="이미지 미리보기"
          />
          {value && (
            <button className={style.previewDelete} onClick={handleClearClick}>
              <img src={iconX} alt="삭제 아이콘" className={style.deleteIcon} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FileInput;
