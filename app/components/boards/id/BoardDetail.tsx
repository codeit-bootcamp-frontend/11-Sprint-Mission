"use client";

import { useEffect, useState } from "react";
import BoardDetailHeader from "./DetailHeader";
import styles from "./BoardDetail.module.css";

interface BoardDetailProps {
  id: string;
}

export default function BoardDetail({ id }: BoardDetailProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/articles/${id}`
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오지 못했습니다.");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 에러가 발생했습니다."
        );
      }
    }

    fetchData();
  }, [id]);

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <BoardDetailHeader
        title={data.title}
        nickname={data.writer.nickname}
        date={new Date(data.updatedAt).toLocaleDateString()}
        likeCount={data.likeCount}
      />
      <div className={styles.content}>
        <p>{data.content}</p>
      </div>
    </div>
  );
}
