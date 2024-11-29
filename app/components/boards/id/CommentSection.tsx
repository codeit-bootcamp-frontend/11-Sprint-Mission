"use client";

import { useState, useEffect } from "react";
import styles from "./CommentSection.module.css";
import {
  fetchCommentsForArticle,
  postComment,
  Comment,
} from "@/app/lib/api/api";
import Image from "next/image";

interface CommentSectionProps {
  articleId: number;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await fetchCommentsForArticle(articleId, { limit });
        setComments(data.list);
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 에러 발생:", error);
      }
    }

    loadComments();
  }, [articleId]);

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      /* 이 부분도 위 addboard 컴포넌트에서 주석으로 달았던 내용과 같습니다.
      localStorage.setItem("accessToken", "abcd1234"); 처럼 임시로 해봤는데
      유효한 토큰이 아니라고 하네요. 그래서 그런지 401 사용자 인증 에러가 뜹니다.
      제가 잘 이해하고 있는 지 모르겠어요. 구글링하면서 해보고 있는거라 ㅜㅜ
      백엔드에서 유효한 토큰을 어떻게 받아오나요?
      */
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const addedComment = await postComment(articleId, newComment);
      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (error) {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2 className={styles.title}>댓글달기</h2>
      <div className={styles.commentInputContainer}>
        <textarea
          className={styles.commentInput}
          placeholder="댓글을 입력해주세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={handleCommentSubmit}
          disabled={!newComment.trim() || isLoading}
        >
          등록
        </button>
      </div>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <p className={styles.commentContent}>{comment.content}</p>
            <div className={styles.commentHeader}>
              <Image
                src={comment.writer.image || "/images/default_user.png"}
                alt="글쓴이"
                width={32}
                height={32}
                className={styles.writerImage}
              />
              <div className={styles.userInfo}>
                <p className={styles.commentNickname}>
                  {comment.writer.nickname}
                </p>
                <p className={styles.commentDate}>
                  {new Date(comment.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
