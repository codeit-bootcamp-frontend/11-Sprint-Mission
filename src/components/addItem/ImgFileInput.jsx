import React, { useRef, useState } from "react";

function ImgFileInput({ children, name, setImage }) {
  const input = useRef();
  const [thumbnail, setThumbnail] = useState("");
  const [showWarn, setShowWarn] = useState(false);
  const isFilled = thumbnail.length > 0;

  const setImg = (path) => {
    setImage((prev) => ({ ...prev, imgUrl: path }));
    setThumbnail(path);
  };

  const handleClick = () => {
    if (!isFilled) input.current.click();
    else setShowWarn(true);
  };

  const handleFileInput = (e) => {
    const imgUrl = e.target.files[0];
    if (imgUrl) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imgPath = fileReader.result;
        setImg(imgPath);
      };
      fileReader.readAsDataURL(imgUrl);
    }
  };

  const handleDelete = () => {
    setImg("");
    setShowWarn(false);
  };

  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        ref={input}
        id={`item_${name}`}
        className="sr-only"
        type="file"
        accept="image/*"
        disabled={isFilled}
        onChange={handleFileInput}
      />
      <div className="upload-area">
        <button
          className="btn-upload-img"
          type="button"
          title="이미지 등록"
          onClick={handleClick}
        >
          <img src="/images/icons/ic_plus.svg" alt="이미지 등록" />
          이미지 등록
        </button>
        {thumbnail && (
          <div className="thumbnail">
            <img src={thumbnail} alt="thumbnail" />
            <button
              type="button"
              className="btn-delete-thumbnail"
              onClick={handleDelete}
            >
              <span className="sr-only">삭제</span>
            </button>
          </div>
        )}
      </div>
      {showWarn && (
        <div className="error-msg">*이미지 등록은 최대 1개까지 가능합니다.</div>
      )}
    </div>
  );
}

export default ImgFileInput;
