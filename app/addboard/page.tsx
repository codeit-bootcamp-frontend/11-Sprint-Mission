"use client";

import { useState } from "react";
import ImageUpload from "../components/ui/ImageUpload";
import InputField from "../components/ui/InputField";
import { addArticle } from "../lib/api/api";
import styles from "./AddBoard.module.css";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null); // 이미지 파일 상태 추가

  const isButtonDisabled = !title || !content;

  const handleSubmit = async () => {
    try {
      const imageUrl = image ? URL.createObjectURL(image) : undefined;
      await addArticle(title, content, imageUrl);

      alert("게시물이 성공적으로 등록되었습니다!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error: any) {
      alert(error.message || "게시물 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>상품 등록하기</h2>
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className={styles.headerButton}
        >
          등록
        </button>
      </div>
      <InputField
        id="title"
        label="*제목"
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputField
        id="content"
        label="*내용"
        type="textarea"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ImageUpload
        title="이미지"
        onImageChange={(file) => setImage(file)} // 이미지 파일 상태 관리
      />
    </div>
  );
}
