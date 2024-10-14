import { useEffect, useRef, useState } from "react";
import "./FileInput.css";
import plus from "../assets/icons/ic_plus.svg";
const style = { display: "none" };

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleDeleteClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  const handleClick = () => {
    inputRef.current.click();
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
    <>
      <div className="imageUpload" onClick={handleClick}>
        <img src={preview} alt="이미지 미리보기" className="previewImage" />
        <div className="imageUploadText">
          <img src={plus} className="plus" alt="상품등록" />
          <label htmlFor="fileInput" className="inputFile">
            이미지 등록
          </label>
        </div>
        {value && (
          <button className="xButton" onClick={handleDeleteClick}>
            x
          </button>
        )}
      </div>
      <div>
        <input
          type="file"
          id="fileInput"
          accept="img/jpg img/jpeg"
          onChange={handleChange}
          ref={inputRef}
          style={style}
        />
      </div>
    </>
  );
}
export default FileInput;
