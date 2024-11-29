'use client';

import ImageUpload from '../../components/additem/ImageUpload';
import { useState } from 'react';
import { postBoardsList } from '../../hooks/api';

export default function Addboard() {
  const [productImage, setProductImage] = useState<File | null>(null); //이미지상태
  const [title, setTitle] = useState<string>(''); //제목 상태
  const [content, setContent] = useState<string>(''); //내용 상태

  const handleImageChange = (name: string, file: File | null) => {
    setProductImage(file);
  };

  const handleSubmit = async () => {
    if (!title || !content || !productImage) {
      alert('모든 필드를 입력해주세요!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', productImage);

      const response = await postBoardsList(
        formData.get('image') as string,
        formData.get('content') as string,
        formData.get('title') as string
      );

      alert('게시글이 성공적으로 등록되었습니다!');
      console.log(response);
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <p>게시글 쓰기</p>
      <button onClick={handleSubmit}>등록</button>
      <p>*제목</p>
      <input
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>*내용</p>
      <textarea
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <p>이미지</p>
      <ImageUpload
        name={productImage ? productImage.name : ''}
        value={productImage}
        onChange={handleImageChange}
      />
    </div>
  );
}
