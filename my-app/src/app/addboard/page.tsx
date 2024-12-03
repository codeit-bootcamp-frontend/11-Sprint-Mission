"use client";
import Image from "next/image";
import { useState } from "react";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const isButtonDisabled = !(title && content && !image);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto pt-4 pb-0 px-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">게시글 쓰기</h3>
        <button
          className={`w-[74px] h-[42px] bg-gray400 rounded-[8px] text-background
            ${isButtonDisabled ? "bg-gray400" : "bg-skyblue"}`}
          disabled={isButtonDisabled}
        >
          등록
        </button>
      </div>
      <form className="mt-[24px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[12px]">
            <label
              className="text-[14px] text-foreground font-bold"
              htmlFor="title"
            >
              *제목
            </label>
            <input
              className="w-full h-[56px] bg-gray100 rounded-[12px] placeholder:text-gray400 pl-[24px]"
              type="text"
              id="title"
              placeholder="제목을 입력해주세요"
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <label
              className="text-[14px] text-foreground font-bold"
              htmlFor="content"
            >
              *내용
            </label>
            <textarea
              className="w-full h-[200px] bg-gray100 rounded-[12px] placeholder:text-gray400 pl-[24px] pt-[16px]"
              id="content"
              placeholder="내용을 입력해주세요"
              onChange={handleContentChange}
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <label
              className="text-[14px] text-foreground font-bold"
              htmlFor="image"
            >
              이미지
            </label>
            <div className="relative">
              <input
                type="file"
                id="image"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
                accept="image/*"
              />
              <button className="bg-gray100 w-[168px] h-[168px]">
                <div className="flex flex-col items-center justify-center gap-[20px]">
                  <div className="relative w-[48px] h-[48px]">
                    <Image src="/icon/img_plus.png" fill alt="이미지 등록" />
                  </div>
                  <span className="text-gray400">이미지 등록</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
