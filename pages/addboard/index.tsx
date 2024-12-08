import ImageUpload from "@/components/ui/ImageUpload";
import InputItem from "@/components/ui/InputItem";
import { FormEvent, useState } from "react";

const AddBoard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 이미지 제외 모든 input에 값이 입력
  const isSubmit = !title.trim() || !content.trim();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>게시글 쓰기</h3>
          <button type="submit" disabled={isSubmit}>
            등록
          </button>
        </div>

        <div>
          <InputItem
            id="title"
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />
          <InputItem
            id="content"
            label="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
            isTextArea
          />
          <ImageUpload title="이미지" />
        </div>
      </form>
    </div>
  );
};

export default AddBoard;
