import React, { useState } from "react";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
  onImageChange: (image: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    }
  };

  return (
    <div className={styles.photo}>
      <div className={styles.box}>
        <label htmlFor="image-upload" className={styles.label}>
          <p className={styles.plus}>+</p>
          <p className={styles.upload}>이미지등록</p>
        </label>
      </div>
      <input
        type="file"
        id="image-upload"
        className={styles.none}
        onChange={handleImageChange}
      />
      {preview && (
        <div className={styles.preview}>
          <img className={styles.image} src={preview} alt="이미지 미리보기" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
