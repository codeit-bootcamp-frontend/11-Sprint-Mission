'use client';

import ImageUpload from '../../components/additem/ImageUpload';
import { useState } from 'react';

export default function Addboard() {
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleImageChange = (name: string, file: File | null) => {
    setProductImage(file);
  };

  return (
    <div>
      <p>게시글 쓰기</p>
      <p>*제목</p>
      <input placeholder="제목을 입력해주세요" />
      <p>*내용</p>
      <textarea placeholder="내용을 입력해주세요" />
      <p>이미지</p>
      <ImageUpload
        name={productImage ? productImage.name : ''}
        value={productImage}
        onChange={handleImageChange}
      />
    </div>
  );
}
