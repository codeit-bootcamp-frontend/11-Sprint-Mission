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
  로그인 기능을 구현해야 하는건가요? 예전에 js로 만든 로그인 기능을 next에서 사용 할 컴포넌트로 바꿔야 하는건가요?
  일단 등록버튼을 클릭하면 인풋필드를 비우고 등록했다는 내용을 화면에 표시되도록 했습니다
  이어지는 심화 내용인 상세 페이지 이동도 아마 등록을 한 이후에 등록된 내용의 id 페이지로 이동하는 것으로 예상되는데
  이 부분도 위 내용을 진행해야 적용할 수 있을 것으로 보입니다.
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
