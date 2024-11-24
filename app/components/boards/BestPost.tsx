"use client";
import styles from "./BestPost.module.css";
import { useEffect, useState } from "react";
import { fetchArticles, Article } from "@/app/lib/api/api";
import Image from "next/image";

export default function BestPost() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetchArticles({
          page: 1,
          pageSize: 3,
          orderBy: "like",
        });
        setArticles(response.list);
      } catch (err: any) {
        setError(err.message);
      }
    }

    loadArticles();
  }, []);

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className={styles.sectionTitle}>베스트 게시글</h2>
      <div className={styles.postList}>
        {articles.map((article) => (
          <div key={article.id} className={styles.post}>
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
                  src={article.image}
                  alt={article.title}
                  width={48}
                  height={48}
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.metaContainer}>
              <div className={styles.postInfo}>
                <div className={styles.metaName}>{article.writer.nickname}</div>
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
        ))}
      </div>
    </div>
  );
}
