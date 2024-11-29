"use client";

import { useRouter, useParams } from "next/navigation";
import BoardDetail from "@/app/components/boards/id/BoardDetail";
import CommentSection from "@/app/components/boards/id/CommentSection";
import styles from "./BoardDetailPage.module.css";

export default function BoardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const handleGoBack = () => {
    router.push("/boards");
  };

  return (
    <div className="container">
      <BoardDetail id={id} />
      <CommentSection articleId={Number(id)} />
      <div className={styles.buttonContainer}>
        <button className={styles.goToButton} onClick={handleGoBack}>
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}
