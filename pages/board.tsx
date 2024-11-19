import { useState } from "react";
import GetArticle from "@/components/getArticles";
import { Article } from "@/types/commontypes";
import Image from "next/image";
import styles from "@/styles/board.module.css";
import defaultImage from "@/public/pngs/noImage.png";
import medal from "@/public/svgs/ic_medal.svg";
import heart from "@/public/svgs/ic_heart (1).svg";
import profileImg from "@/public/svgs/Frame 2609463.svg";
import searchIcon from "@/public/svgs/ic_search.svg";

export default function Board() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortOrder, setSortOrder] = useState("최신순");

  const getBestArticles = (articles: Article[]) => {
    return [...articles].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);
  };

  const handleDataFetch = (data: Article[]) => {
    setArticles((prev) => {
      const mergedArticles = [...prev, ...data];
      const uniqueArticles = mergedArticles.filter(
        (article, index, self) =>
          self.findIndex((a) => a.id === article.id) === index
      );

      const sortedArticles = uniqueArticles.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return sortedArticles;
    });
  };

  const getSortedArticles = () => {
    if (sortOrder === "최신순") {
      return [...articles].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOrder === "인기순") {
      return [...articles].sort((a, b) => b.likeCount - a.likeCount);
    }
    return articles;
  };

  const bestArticles = getBestArticles(articles);
  const sortedArticles = getSortedArticles();

  return (
    <div className={styles.board_container}>
      <GetArticle onDataFetch={handleDataFetch} />
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

      <div className={styles.article_container}>
        <div className={styles.article_top}>
          <h2 className={styles.h2}>게시글</h2>
          <button className={styles.button}>글쓰기</button>
        </div>

        <div className={styles.article_controls}>
          <div className={styles.article_search}>
            <Image src={searchIcon} alt="검색아이콘" width={24} height={24} />
            <input
              type="text"
              className={styles.search_input}
              placeholder="검색할 상품을 입력해주세요"
            ></input>
          </div>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdown_button}
              onClick={() =>
                setSortOrder((prev) =>
                  prev === "최신순" ? "인기순" : "최신순"
                )
              }
            >
              {sortOrder} ▼
            </button>
          </div>
        </div>

        <article className={styles.article}>
          {sortedArticles.length > 0 ? (
            sortedArticles.map((article) => (
              <div key={article.id}>
                <div className={styles.article_content}>
                  <div className={styles.article_title}>{article.title}</div>
                  <div className={styles.image_container}>
                    <Image
                      src={article.image || defaultImage}
                      alt={article.title}
                      width={72}
                      height={72}
                    />
                  </div>
                </div>
                <div className={styles.article_bottom}>
                  <div className={styles.article_bottom_front}>
                    <Image
                      src={profileImg}
                      alt="프로필이미지"
                      width={24}
                      height={24}
                    />
                    <div className={styles.article_author}>
                      {article.writer.nickname}
                    </div>
                    <div className={styles.article_date}>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={styles.article_like}>
                    <Image src={heart} alt="하트" width={24} height={24} />
                    {article.likeCount}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </article>
      </div>
    </div>
  );
}
