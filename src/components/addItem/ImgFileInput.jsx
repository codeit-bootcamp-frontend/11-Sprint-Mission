import React, { useEffect, useRef, useState } from "react";

function ImgFileInput({ children, images, name, dispatch }) {
  const inputRef = useRef();
  const [showWarn, setShowWarn] = useState(false); // 이미지를 1개 이상 추가하려고 할 때를 위한 state
  const isFilled = images.length > 0;

  /**
   * form의 이미지를 저장하고 화면에 추가한 이미지를 렌더링
   * @param {*} path 인코딩된 파일 스트링
   */
  const setImg = (path) => {
    dispatch({ type: "SET_IMAGES", payload: path ? [path] : [] });
  };

  /**
   * 이미지 파일 추가 - 1개 이상인 경우 클릭 시 경고 노출
   */
  const handleClick = () => {
    if (!isFilled) inputRef.current.click();
    else setShowWarn(true);
  };

  /**
   * 입력 받은 파일을 인코딩하고 저장 및 렌더링
   * @param {*} e
   */
  const handleFileInput = (e) => {
    const imgUrl = e.target.files[0];
    if (imgUrl) {
      const imgPath = URL.createObjectURL(imgUrl);
      setImg(imgPath);
      inputRef.current.value = null;
    }
  };

  /**
   * 이미지 삭제
   */
  const handleDelete = () => {
    setImg();
    setShowWarn(false);
  };

  /**
   * 컴포넌트 언마운트 시 객체 URL이 있으면 해제
   */
  useEffect(() => {
    return () => {
      if (images.length > 0) URL.revokeObjectURL(images[0]);
    };
  }, [images]);

  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        ref={inputRef}
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
        {isFilled && (
          <div className="thumbnail">
            <img src={images[0]} alt="thumbnail" />
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
