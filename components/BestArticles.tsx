import { useState, useEffect } from "react";
import Image from "next/image";
import { Article } from "@/types/commontypes";
import styles from "@/styles/board.module.css";
import medal from "@/public/svgs/ic_medal.svg";
import heart from "@/public/svgs/ic_heart (1).svg";
import defaultImage from "@/public/pngs/noImage.png";

interface BestArticlesProps {
  articles: Article[];
}

const getPageSize = () => {
  if (typeof window === "undefined") return 3;
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 3;
};

export default function BestArticles({ articles }: BestArticlesProps) {
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bestArticles = [...articles]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, pageSize);

  return (
    <div className={styles.best_article_container}>
      <h1 className={styles.h1}>베스트 게시글</h1>
      <article className={styles.best_article}>
        {bestArticles.map((article) => (
          <div key={article.id} className={styles.container}>
            <div className={styles.clip}>
              <Image
                className={styles.medal}
                src={medal}
                alt="메달"
                width={16}
                height={16}
              />{" "}
              Best
            </div>
            <div className={styles.best_article_middle}>
              <div className={styles.best_article_title}>{article.title}</div>
              <div className={styles.image_container}>
                <Image
                  src={article.image || defaultImage}
                  alt={article.title}
                  width={72}
                  height={72}
                />
              </div>
            </div>
            <div className={styles.best_article_bottom}>
              <div className={styles.best_article_bottom_front}>
                <div className={styles.best_article_author}>
                  {article.writer.nickname}
                </div>
                <div className={styles.best_article_like}>
                  <Image src={heart} alt="하트" width={16} height={16} />
                  {article.likeCount}
                </div>
              </div>
              <div className={styles.best_article_date}>
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
}
