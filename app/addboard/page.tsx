"use client";

import { useState } from "react";
import ImageUpload from "../components/ui/ImageUpload";
import InputField from "../components/ui/InputField";
import styles from "./AddBoard.module.css";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isButtonDisabled = !title || !content;

  const handleSubmit = () => {
    alert("등록했습니다!");
    setTitle("");
    setContent("");
  };
  /*심화 요구사항에 회원가입, 로그인 api를 사용하여 받은 accessToken을 사용하여 게시물 등록을 합니다가 있는데
  어떻게 해야 할 지 감이 안 잡힙니다...
  로그인 기능을 추가해야 하나요? 아니면 백엔드 서버에서 받아와야 하는건가요?
  일단 등록버튼을 클릭하면 인풋필드를 비우고 등록했다는 내용을 화면에 표시되도록 했습니다
  */

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
      <ImageUpload title="이미지" />
    </div>
  );
}
