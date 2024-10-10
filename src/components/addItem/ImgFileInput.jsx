import React, { useRef, useState } from "react";

function ImgFileInput({ children, name, setImage }) {
  const input = useRef();
  const [thumbnail, setThumbnail] = useState("");
  const handleFileInput = ({ target }) => {
    const imgUrl = target.files[0];
    if (imgUrl) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imgPath = fileReader.result;
        setImage((prev) => ({ ...prev, imgUrl: imgPath }));
        setThumbnail(imgPath);
      };
      fileReader.readAsDataURL(imgUrl);
    }
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
        onChange={handleFileInput}
      />
      <div className="upload-area">
        <button
          className="btn-upload-img"
          type="button"
          title="이미지 등록"
          onClick={() => input.current.click()}
        >
          <img src="/images/icons/ic_plus.svg" alt="이미지 등록" />
          이미지 등록
        </button>
        {thumbnail && (
          <div className="thumbnail">
            <img src={thumbnail} alt="thumbnail" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImgFileInput;
