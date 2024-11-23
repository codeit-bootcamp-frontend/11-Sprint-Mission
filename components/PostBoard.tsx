import { Article, ArticleList } from "@/types/Article";
import Image from "next/image";
import styles from "./PostBoard.module.css";

export default function PostBoard({ articles }: { articles: ArticleList }) {
  return (
    <div className={styles.Board}>
      <header className={styles.BoardHeader}>
        <h2 className={styles.BoardTitle}>게시글</h2>
        <button className={styles.BoardBlueButton}>글쓰기</button>
      </header>
      <div className={styles.BoardUtil}>
        <form className={styles.PostSearchFrom}>
          <fieldset className={styles.PostSearchField}>
            <label htmlFor="search">
              <Image
                fill
                src="/images/ic_search.svg"
                alt="겅색할 상품을 입력해주세요"
              />
            </label>
            <input
              id="search"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            />
          </fieldset>
        </form>
        <div className={styles.PostOrderBySelect}>
          <div className={styles.body}>
            <span>최신순</span>
            <div className={styles.image}>
              <Image fill src="/images/ic_arrow_down.svg" alt="정렬" />
            </div>
          </div>
          <div className={styles.wrap}>
            <div className={styles.option} data-option="recent">
              최신순
            </div>
            <div className={styles.option} data-option="like">
              인기순
            </div>
          </div>
        </div>
      </div>
      <div className={styles.BoardItemList}>
        {articles.list.map((article) => (
          <PostBoardItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

function PostBoardItem({ article }: { article: Article }) {
  return (
    <div className={styles.Item}>
      <div className={styles.ItemContent}>
        <h3 className={styles.ItemTitle}> {article.title}</h3>
        <div className={styles.ItemPreview}>
          {article.image && (
            <Image
              fill
              src={article.image}
              alt={article.title}
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.wrap}>
          <div className={styles.image}>
            <Image
              fill
              src="/images/profile.svg"
              alt={article.writer.nickname}
            />
          </div>
          <span className={styles.ItemWriter}>{article.writer.nickname}</span>
          <span>{article.createdAt}</span>
        </div>
        <div className={styles.wrap}>
          <div className={styles.image}>
            <Image
              fill
              src="/images/ic_heart.svg"
              alt={article.writer.nickname}
            />
          </div>
          <span className={styles.ItemLikeCount}>
            {article.likeCount < 10000 ? article.likeCount : "9999+"}
          </span>
        </div>
      </div>
    </div>
  );
}
