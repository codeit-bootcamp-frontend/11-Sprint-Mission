import React, { useState } from "react";
import styles from "./CommentInput.module.css";
import { createComment } from "../../api/posts";

interface Comment {
  id: number;
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
}

interface CommentInputProps {
  articleId: number;
  onAddComment: (newComment: Comment) => void;
}

const CommentInput = ({ articleId, onAddComment }: CommentInputProps) => {
  const [value, setValue] = useState({
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ content: e.target.value });
  };

  const isValueValid = () => !value.content;

  const handleCommentSubmit = async () => {
    if (!value.content) return;
    try {
      const commentData = { content: value.content };
      const newComment = await createComment(articleId, commentData);
      setValue({ content: "" });
      onAddComment(newComment);
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };
  return (
    <section className={styles.container}>
      <p className={styles.title}>댓글달기</p>
      <div className={styles.box}>
        <textarea
          value={value.content}
          className={styles.input}
          placeholder="댓글을 입력해주세요."
          onChange={handleChange}
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className={styles.button}
          disabled={isValueValid()}
        >
          등록
        </button>
      </div>
    </section>
  );
};

export default CommentInput;
