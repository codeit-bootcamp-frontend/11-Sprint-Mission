import { uploadImage } from '@/api/imageApi';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styles from '@/components/common/FileInput.module.css';
import IconPlus from '@/public/ic_plus.svg';

interface FileInputProps {
  onChangeFile: (url: string) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChangeFile }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // upload
      try {
        const data = await uploadImage(file);
        if (data?.url) onChangeFile(data?.url);
      } catch (error) {
        console.error('파일 업로드 실패:', error);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.fileInput}
        ref={fileInputRef}
      ></input>
      <div
        className={styles.image}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={styles['image-block']}>
          {preview ? (
            <Image
              src={preview}
              alt="미리보기"
              className={styles['image-preview']}
              width={168}
              height={168}
            />
          ) : (
            <>
              <Image src={IconPlus} alt="이미지 등록" width={48} height={48} />
              <div className={styles['image-txt']}>이미지 등록</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileInput;
