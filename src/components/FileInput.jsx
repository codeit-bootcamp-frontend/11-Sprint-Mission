import "./FileInput.css";
import { useRef, useEffect, useState } from "react";

import Img from "../assets/img.svg";
import XBtn from "../assets/icons/ic_X.svg";

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

    inputNode.value = "";
    onChange(name, null);
  };

  const handleImageClick = () => {
    inputRef.current.click(); // 이미지를 클릭하면 파일 선택창을 열도록 함
  };

  /**
   *  ObjectURL 만들기
   *  const objectURL = URL.createObjectURL(file);
   *
   *  ObjectURL 해제하기
   *  URL.revokeObjectURL(objectURL);
   */

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
    <div className="FileInput">
      <div className="FileInput__imgContainer">
        <img
          src={Img}
          htmlFor="input-file"
          onClick={handleImageClick}
          className="FileInput__img"
        />
      </div>
      <input
        type="file"
        id="input-file"
        onChange={handleChange}
        ref={inputRef}
        className="FileInput__origin"
      />

      {preview && (
        <div className="FileInput__previewContainer">
          <div className="FileInput__previewWrapper">
            <img
              src={preview}
              alt="이미지 미리보기"
              className="FileInput__preview"
            />
          </div>
          <img
            src={XBtn}
            onClick={handleClearClick}
            className="FileInput__previewBtn"
          />
        </div>
      )}
    </div>
  );
}

export default FileInput;
