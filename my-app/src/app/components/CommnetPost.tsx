"use client";
import { useState } from "react";

export default function CommentPost() {
  const [content, setContent] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const isButtonDisabled = content.length === 0;
  return (
    <div>
      <h3 className="text-4 font-bold">댓글달기</h3>
      <textarea
        className="w-full h-[100px] bg-gray100 rounded-[12px] mt-[9px] mb-4 pt-4 pl-6 "
        placeholder="댓글을 입력해주세요"
        onChange={handleContentChange}
      ></textarea>
      <div className="flex justify-end">
        <button
          className={`w-[74px] h-[42px] bg-gray400 text-white rounded-[8px] ${
            isButtonDisabled ? "bg-gray400" : "bg-skyblue"
          }`}
          disabled={isButtonDisabled}
        >
          등록
        </button>
      </div>
    </div>
  );
}
