import React, { useRef, useState } from "react";

function ImgFileInput({ children, name, setImage }) {
  const input = useRef();
  const [thumbnail, setThumbnail] = useState(""); // 추가한 이미지를 관리하기 위한 state
  const [showWarn, setShowWarn] = useState(false); // 이미지를 1개 이상 추가하려고 할 때를 위한 state
  const isFilled = thumbnail.length > 0;

  /**
   * form의 이미지를 저장하고 화면에 추가한 이미지를 렌더링
   * @param {*} path 인코딩된 파일 스트링
   */
  const setImg = (path) => {
    setImage((prev) => ({ ...prev, images: [path] }));
    setThumbnail(path);
  };

  /**
   * 이미지 파일 추가 - 1개 이상인 경우 클릭 시 경고 노출
   */
  const handleClick = () => {
    if (!isFilled) input.current.click();
    else setShowWarn(true);
  };

  /**
   * 입력 받은 파일을 인코딩하고 저장 및 렌더링
   * @param {*} e
   */
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

  /**
   * 이미지 삭제
   */
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
