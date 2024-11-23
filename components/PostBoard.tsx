import { Article, ArticleList } from "@/types/Article.type";
import Image from "next/image";
import styles from "./PostBoard.module.css";
import { useEffect, useRef, useState } from "react";
import { getArticleList, GetArticleListParams } from "@/lib/article.api";
import formatDate from "../lib/formatDate";

const DEFAULT_ARTICLE_LIST: ArticleList = {
  totalCount: 0,
  list: [],
};

const DEFAULT_PARAMS: GetArticleListParams = {
  page: 1,
  pageSize: 10,
  orderBy: "recent",
};

export default function PostBoard() {
  const [articles, setArticles] = useState(DEFAULT_ARTICLE_LIST);
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [selectedDropdown, setSelecedDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickDropdown = () => setSelecedDropdown((prev) => !prev);

  const handleClickOption = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.dataset.option) return;
    setParams((prev) => {
      return {
        ...prev,
        orderBy: target.dataset.option as "recent" | "like",
      };
    });
  };

  const handleClickDropdownOutside = (event: MouseEvent) => {
    if (!dropdownRef.current) return;
    if (dropdownRef.current.contains(event.target as Node)) return;
    setSelecedDropdown(false);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticleList(params);
      setArticles(data);
    };
    fetchArticles();

    document.addEventListener("click", handleClickDropdownOutside);

    return () =>
      document.removeEventListener("click", handleClickDropdownOutside);
  }, [params]);

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
              <Image fill src="/images/ic_search.svg" alt="검색" />
            </label>
            <input
              id="search"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            />
          </fieldset>
        </form>
        <div
          className={styles.OrderByDropdown}
          onClick={handleClickDropdown}
          ref={dropdownRef}
        >
          <div className={styles.select}>
            <span>최신순</span>
            <div className={styles.image}>
              <Image fill src="/images/ic_arrow_down.svg" alt="정렬" />
            </div>
          </div>
          {selectedDropdown && (
            <div className={styles.wrap} onClick={handleClickOption}>
              <div className={styles.option} data-option="recent">
                최신순
              </div>
              <div className={styles.option} data-option="like">
                인기순
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.PostItemList}>
        {articles.list.map((article) => (
          <PostItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

function PostItem({ article }: { article: Article }) {
  const createdAt = formatDate(article.createdAt);

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
          <span>{createdAt}</span>
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
