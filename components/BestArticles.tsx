import { useState, useEffect } from "react";
import Image from "next/image";
import { Article, GetArticlesResponse } from "@/types/commontypes";
import styles from "@/styles/board.module.css";
import medal from "@/public/svgs/ic_medal.svg";
import heart from "@/public/svgs/ic_heart (1).svg";
import defaultImage from "@/public/pngs/noImage.png";
import { getArticles } from "@/lib/api";
import Link from "next/link";

const getPageSize = () => {
  if (typeof window === "undefined") return 3;
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 3;
};

export default function BestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number>(getPageSize);

  useEffect(() => {
    const fetchArticles = async ({
      orderBy = "like",
      pageSize,
    }: {
      orderBy?: string;
      pageSize: number;
    }) => {
      try {
        const response: GetArticlesResponse = await getArticles({
          orderBy,
          pageSize,
        });
        setArticles(response.list);
      } catch (error) {
        console.error("게시물을 가져오는 중 오류 발생:", error);
      }
    };

    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);

    fetchArticles({ orderBy: "like", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <div className={styles.best_article_container}>
      <h1 className={styles.h1}>베스트 게시글</h1>
      <article className={styles.best_article}>
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/boards/${article.id}`}
            className={styles.best_article_link}
          >
            <div className={styles.container}>
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
          </Link>
        ))}
      </article>
    </div>
  );
}
