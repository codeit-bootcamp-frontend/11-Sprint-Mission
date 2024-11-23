import { Article, ArticleList } from "@/types/Article.type";
import styles from "./BestPostBoard.module.css";
import Image from "next/image";
import formatDate from "../lib/formatDate";
import { useDeviceType } from "@/contexts/DeviceTypeContext";

const PAGE_SIZE = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
};

export default function BestPostBoard({ articles }: { articles: ArticleList }) {
  const deviceType = useDeviceType();

  return (
    <div className={styles.Board}>
      <header className={styles.BoardHeader}>
        <h2 className={styles.BoardTitle}>베스트 게시글</h2>
      </header>
      <div className={styles.PostItemList}>
        {articles.list.map((article, i) => {
          if (i < PAGE_SIZE[deviceType]) {
            return <PostItem key={article.id} article={article} />;
          }
        })}
      </div>
    </div>
  );
}

function PostItem({ article }: { article: Article }) {
  const createdAt = formatDate(article.createdAt);

  return (
    <div className={styles.Item}>
      <div className={styles.badge}>
        <div className={styles.medal}>
          <Image fill src="/images/ic_medal.svg" alt="베스트" />
        </div>
        <span>Best</span>
      </div>
      <div className={styles.main}>
        <h3 className={styles.title}>{article.title}</h3>
        <div className={styles.preview}>
          <Image fill src={article.image} alt={article.title} />
        </div>
      </div>
      <div className={styles.util}>
        <span>{article.writer.nickname}</span>
        <div className={styles.likeCount}>
          <div className={styles.heart}>
            <Image fill src="/images/ic_heart.svg" alt="베스트" />
          </div>
          <span>{article.likeCount < 10000 ? article.likeCount : "9999+"}</span>
        </div>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}
