import React, { useRef, useState } from "react";
import { ReactComponent as PlusImg } from "../../../images/icons/plusimg.svg";

function ImageUpload({ title }) {
  const [preview, setPreview] = useState("");
  const fileInput = useRef(null);
  const inputId = "image-upload";

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const prevUrl = URL.createObjectURL(file);
      setPreview(prevUrl);
    }
  };
  return (
    <div className="imgContainer">
      {title && (
        <label className="inputLabel" htmlFor={inputId}>
          {title}
        </label>
      )}
      <button className="imgButton" onClick={handleButtonClick}>
        <PlusImg />
      </button>
      <input
        type="file"
        id={inputId}
        ref={fileInput}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      {preview && (
        <img className="prevImg" src={preview} alt="이미지 미리보기" />
      )}
    </div>
  );
}

export default ImageUpload;
