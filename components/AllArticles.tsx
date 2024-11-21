import { useState, useEffect } from "react";
import Image from "next/image";
import { Article } from "@/types/commontypes";
import styles from "@/styles/board.module.css";
import profileImg from "@/public/svgs/Frame 2609463.svg";
import heart from "@/public/svgs/ic_heart (1).svg";
import defaultImage from "@/public/pngs/noImage.png";
import searchIcon from "@/public/svgs/ic_search.svg";
import { getArticles } from "@/lib/api";

interface AllArticlesProps {
  onDataFetch: (data: Article[]) => void;
}

export default function AllArticles({ onDataFetch }: AllArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [sortOrder, setSortOrder] = useState("recent");
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (reset: boolean = false) => {
    try {
      if (isFetching) return;
      setIsFetching(true);

      const currentPage = reset ? 1 : page;

      const data = await getArticles({
        orderBy: sortOrder,
        page: currentPage,
        pageSize: 10,
      });

      if (reset) {
        setArticles(data.list);
        onDataFetch(data.list);
      } else {
        if (currentPage === page) {
          const updatedArticles = [...articles, ...data.list];
          setArticles(updatedArticles);
          onDataFetch(updatedArticles);
        }
      }

      if (data.list.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setIsFetching(false);
    } catch (error) {
      console.error("게시글 데이터를 가져오는 중 오류가 발생했습니다:", error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchArticles(true);
  }, [sortOrder]);

  useEffect(() => {
    if (page === 1) return;
    fetchArticles();
  }, [page]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 50 &&
          !isFetching &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore]);

  const handleSortOrderChange = (orderBy: "recent" | "like") => {
    if (sortOrder !== orderBy) {
      setSortOrder(orderBy);
      setPage(1);
      setHasMore(true);
    }
  };

  return (
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
          />
        </div>
        <div className={styles.dropdown}>
          <div className={styles.dropdown_button}>{sortOrder} ▼</div>
          <div className={styles.dropdown_menu}>
            <button
              className={styles.dropdown_item}
              onClick={() => handleSortOrderChange("recent")}
            >
              최신순
            </button>
            <button
              className={styles.dropdown_item}
              onClick={() => handleSortOrderChange("like")}
            >
              인기순
            </button>
          </div>
        </div>
      </div>

      <article className={styles.article}>
        {articles.map((article) => (
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
        ))}
      </article>
      {isFetching && <p>로딩 중...</p>}
      {!hasMore && <p>더 이상 게시글이 없습니다.</p>}
    </div>
  );
}
