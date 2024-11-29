"use client";

import { useState } from "react";
import ImageUpload from "../components/ui/ImageUpload";
import InputField from "../components/ui/InputField";
import styles from "./AddBoard.module.css";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>상품 등록하기</h2>
        <button className={styles.headerButton}>등록</button>
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
      <ImageUpload title="이미지" />
    </div>
  );
}
