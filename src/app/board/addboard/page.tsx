'use client';

import { useState } from 'react';
import FileUploadInput from '@/components/board/addboard/FileUploadInput';

export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div className="mt-10 mb-24 container">
        <div>
          <div className="flex justify-center justify-between">
            <h2 className="h2 mb-6">게시글 쓰기</h2>
            {title.trim() && content.trim() ? (
              <button className="bg-blue w-[74px] h-[42px] text-white rounded-lg font-medium flex items-center justify-center">
                등록
              </button>
            ) : (
              <button className="bg-gray-400 w-[74px] h-[42px] text-white rounded-lg font-medium flex items-center justify-center">
                등록
              </button>
            )}
          </div>
          <form>
            <label htmlFor="title" className="h3">
              *제목
            </label>
            <input
              id="title"
              type="text"
              className="input h-[56px] mb-6 mt-3"
              placeholder="제목을 입력해주세요"
              onChange={handleTitleChange}
            />
            <label htmlFor="content" className="h3">
              *내용
            </label>
            <textarea
              id="content"
              className="input h-[282px] mb-6 mt-3 resize-none"
              placeholder="내용을 입력해주세요"
              onChange={handleContentChange}
            />
            <label className="h3">이미지</label>
            <FileUploadInput />
          </form>
        </div>
      </div>
    </>
  );
}
