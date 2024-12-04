"use client";
import styles from "./BestPost.module.css";
import { useEffect, useState } from "react";
import { fetchArticles, Article, PaginatedResponse } from "@/app/lib/api/api";
import Image from "next/image";
import usePageSize from "@/app/hooks/usePagesize";
import Link from "next/link";

export default function BestPost() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pageSizeType: "mobile" | "tablet" | "desktop" = usePageSize();

  const pageSizeMap: Record<"mobile" | "tablet" | "desktop", number> = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };
  const pageSize = pageSizeMap[pageSizeType];

  useEffect(() => {
    async function loadArticles() {
      try {
        const response: PaginatedResponse<Article> = await fetchArticles({
          page: 1,
          pageSize: pageSize,
          orderBy: "like",
        });
        setArticles(response.list);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 에러가 발생했습니다.");
        }
      }
    }

    loadArticles();
  }, [pageSize]);

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className={styles.sectionTitle}>베스트 게시글</h2>
      <div className={styles.postList}>
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/boards/${article.id}`}
            className={styles.detailLink}
          >
            <div className={styles.post}>
              <div className={styles.bestMedal}>
                <Image
                  width={16}
                  height={16}
                  src="/images/ic_medal.png"
                  alt="메달"
                />
                Best
              </div>
              <div className={styles.postContents}>
                <h3 className={styles.title}>{article.title}</h3>
                <div className={styles.imgContainer}>
                  <Image
                    src={article.image || "/images/default.png"}
                    alt={article.title || "default"}
                    width={48}
                    height={48}
                    className={styles.image}
                  />
                </div>
              </div>
              <div className={styles.metaContainer}>
                <div className={styles.postInfo}>
                  <div className={styles.metaName}>
                    {article.writer.nickname}
                  </div>
                  <div className={styles.metaLike}>
                    <Image
                      width={16}
                      height={16}
                      src="/images/ic_heart.png"
                      alt="하트"
                    />
                    {article.likeCount}
                  </div>
                </div>
                <div className={styles.metaDate}>
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
