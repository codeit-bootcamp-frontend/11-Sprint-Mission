import React, { useRef, useState } from "react";
import { ReactComponent as PlusImg } from "../../../images/icons/plusimg.svg";
import DeleteButton from "../../../components/DeleteButton";

function ImageUpload({ title }) {
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInput = useRef(null);
  const inputId = "image-upload";

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (preview) {
      setErrorMessage("*이미지 등록은 최대 1개까지 가능합니다.");
    } else {
      fileInput.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const prevUrl = URL.createObjectURL(file);
      setPreview(prevUrl);
      setErrorMessage("");
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  const handleImageDelete = () => {
    setPreview("");
    setErrorMessage("");
    fileInput.current.value = "";
  };

  return (
    <div className="imgContainer">
      {title && (
        <label className="inputLabel" htmlFor={inputId}>
          {title}
        </label>
      )}
      <div className="prevImgLayout">
        <button className="imgButton" onClick={handleButtonClick}>
          <PlusImg className="plusImg" />
        </button>
        <input
          type="file"
          id={inputId}
          ref={fileInput}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        {preview && (
          <div className="imgContainergo">
            <img className="prevImg" src={preview} alt="이미지 미리보기" />
            <div className="imgDeleteButtonContainer">
              <DeleteButton onClick={handleImageDelete} />
            </div>
          </div>
        )}
      </div>
      {errorMessage && <p className="errorMsg">{errorMessage}</p>}
    </div>
  );
}

export default ImageUpload;
