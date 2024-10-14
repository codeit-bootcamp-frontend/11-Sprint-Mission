import { useRef, useState } from "react";
import "./AddItemImage.css";

function AddItemImage() {
  const fileInputRef = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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
        setImagePreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImagePreviewUrl(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="upload-item-image">
      <div className="upload-image-container" onClick={handleImageClick}>
        <div className="upload-image-wrapper">
          <img
            className="upload-image"
            src="/images/icons/ic_plus.svg"
            alt="이미지 등록 버튼"
          />
          <p className="upload-image-description">이미지 등록</p>
        </div>
      </div>

      {imagePreviewUrl && (
        <div className="upload-image-container">
          <img
            className="image-preview"
            src={imagePreviewUrl}
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
  );
}

export default AddItemImage;
