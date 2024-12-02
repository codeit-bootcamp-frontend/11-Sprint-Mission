import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/commontypes";
import styles from "@/styles/board.module.css";
import profileImg from "@/public/svgs/Frame 2609463.svg";
import heart from "@/public/svgs/ic_heart (1).svg";
import defaultImage from "@/public/pngs/noImage.png";
import searchIcon from "@/public/svgs/ic_search.svg";
import { getArticles } from "@/lib/api";

export default function AllArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [sortOrder, setSortOrder] = useState("recent");
  const [hasMore, setHasMore] = useState(true);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const fetchArticles = async (page: number = 1) => {
    try {
      if (isFetching) return;
      setIsFetching(true);

      const data = await getArticles({
        orderBy: sortOrder,
        page,
        pageSize: 10,
        keyword: keyword,
      });

      if (page === 1) {
        setArticles(data.list);
      } else {
        const updatedArticles = [...articles, ...data.list];
        setArticles(updatedArticles);
      }

      if (data.list.length < 10) {
        setHasMore(false);
      }

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, [sortOrder]);

  useEffect(() => {
    if (page === 1) return;
    fetchArticles(page);
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

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleOrderByChange = (orderBy: "recent" | "like") => {
    if (sortOrder !== orderBy) {
      setSortOrder(orderBy);
      setPage(1);
      setHasMore(true);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearchSubmit = () => {
    setPage(1);
    setHasMore(true);
    fetchArticles(1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className={styles.article_container}>
      <div className={styles.article_top}>
        <h2 className={styles.h2}>게시글</h2>
        <Link href={"/addboard"}>
          <button className={styles.button}>글쓰기</button>
        </Link>
      </div>

      <div className={styles.article_controls}>
        <div className={styles.article_search}>
          <button onClick={handleSearchSubmit} className={styles.search_button}>
            <Image src={searchIcon} alt="검색아이콘" width={24} height={24} />
          </button>
          <input
            type="text"
            value={keyword}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className={styles.search_input}
            placeholder="검색할 상품을 입력해주세요"
          />
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropdown_button} onClick={toggleDropdown}>
            {sortOrder === "recent" ? "최신순" : "좋아요순"} ▼
          </button>
          {isDropdown && (
            <div className={styles.dropdown_options}>
              <div onClick={() => handleOrderByChange("recent")}>최신순</div>
              <div onClick={() => handleOrderByChange("like")}>좋아요순</div>
            </div>
          )}
        </div>
      </div>

      <article className={styles.article}>
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/boards/${article.id}`}
            className={styles.article_link}
            passHref
          >
            <div>
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
          </Link>
        ))}
      </article>
      {isFetching && <p>로딩 중...</p>}
      {!hasMore && <p>더 이상 게시글이 없습니다.</p>}
    </div>
  );
}
