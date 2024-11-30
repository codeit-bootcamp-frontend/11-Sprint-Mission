import { Article, ArticleList } from "@/types/Article.type";
import Image from "next/image";
import styles from "./PostBoard.module.css";
import { useEffect, useRef, useState } from "react";
import {
  getArticleList,
  GetArticleListParams,
  OrderBy,
} from "@/api/article.api";
import formatDate from "@/lib/formatDate";
import { useDeviceType } from "@/contexts/DeviceTypeContext";
import ImageSafe from "./ImageSafe";
import useAsync from "@/hooks/useAsync";
import useOutsideClick from "@/hooks/useOutsideClick";
import Link from "next/link";

const DEFAULT_PARAMS: GetArticleListParams = {
  page: 1,
  pageSize: 10,
  orderBy: "recent",
};

export default function PostBoard({
  articles: initArticles,
}: {
  articles: ArticleList;
}) {
  const [articles, setArticles] = useState(initArticles);
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [keyword, setKeyword] = useState("");
  const {
    excute: getArticleListAsync,
    loading,
    error,
  } = useAsync(getArticleList);

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    setKeyword(event.target.value.trim());
  };

  const handleChangeOrderBy = (option: OrderBy) =>
    setParams((prev) => {
      return {
        ...prev,
        orderBy: option,
      };
    });

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) return;
    setParams((prev) => {
      return {
        ...prev,
        keyword: keyword,
      };
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticleListAsync(params);
      if (data) setArticles(data);
    };
    fetchArticles();
  }, [params, getArticleListAsync]);

  return (
    <div className={styles.Board}>
      <header className={styles.BoardHeader}>
        <h2 className={styles.BoardTitle}>게시글</h2>
        <Link href="/addboard" className={styles.BoardBlueButton}>
          글쓰기
        </Link>
      </header>
      <div className={styles.BoardUtil}>
        <form className={styles.PostSearchFrom} onSubmit={handleSubmitSearch}>
          <fieldset className={styles.PostSearchField}>
            <label htmlFor="search">
              <Image fill src="/images/ic_search.svg" alt="검색" />
            </label>
            <input
              id="search"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              onChange={handleChangeKeyword}
            />
          </fieldset>
        </form>
        <Dropdown
          orderBy={params.orderBy as OrderBy}
          onChange={handleChangeOrderBy}
        />
      </div>
      <div className={styles.PostItemList}>
        {articles?.list.map((article) => (
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
          <ImageSafe src={article.image} alt={article.title} />
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

function Dropdown({
  orderBy,
  onChange,
}: {
  orderBy: OrderBy;
  onChange: (option: OrderBy) => void;
}) {
  const [selectedDropdown, setSelecedDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { flag } = useOutsideClick(dropdownRef);
  const deviceType = useDeviceType();

  const handleClickDropdown = () => setSelecedDropdown((prev) => !prev);

  const handleClickOption = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.dataset.option) return;
    onChange(target.dataset.option as OrderBy);
  };

  useEffect(() => {
    setSelecedDropdown(!flag);
  }, [flag]);

  return (
    <div
      className={styles.OrderByDropdown}
      onClick={handleClickDropdown}
      ref={dropdownRef}
    >
      <div className={styles.select}>
        {deviceType !== "mobile" && (
          <span>{orderBy === "recent" ? "최신순" : "인기순"}</span>
        )}
        <div className={styles.image}>
          <Image
            fill
            src={
              deviceType !== "mobile"
                ? "/images/ic_arrow_down.svg"
                : "/images/ic_sort.svg"
            }
            alt="정렬"
          />
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
  );
}
