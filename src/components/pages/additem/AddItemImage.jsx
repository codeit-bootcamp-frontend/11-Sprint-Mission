import { useRef, useState } from 'react';
import './AddItemImage.css';

function AddItemImage({ image, setImage }) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage('');
    fileInputRef.current.value = '';
  };

  return (
    <div className="upload-item-image">
      <div className="upload-image-wrapper">
        <div className="upload-image-container" onClick={handleImageClick}>
          <div className="upload-image-btn">
            <img
              className="upload-image"
              src="/images/icons/ic_plus.svg"
              alt="이미지 등록 버튼"
            />
            <p className="upload-image-description">이미지 등록</p>
          </div>
        </div>

        {image && (
          <div className="upload-image-container">
            <img
              className="image-preview"
              src={image}
              alt="업로드된 이미지 미리보기"
            />
            <img
              className="remove-upload-btn"
              src="/images/icons/ic_X.svg"
              alt="이미지 등록 취소 버튼"
              onClick={handleImageDelete}
            />
          </div>
        )}

        <input
          id="image-input"
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <p className="image-warning-message">
          *이미지 등록은 최대 1개까지 가능합니다.
        </p>
      )}
    </div>
  );
}

export default AddItemImage;
