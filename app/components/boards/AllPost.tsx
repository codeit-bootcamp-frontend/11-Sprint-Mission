"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./AllPost.module.css";
import SearchInput from "@/app/components/ui/SearchInput";
import { fetchArticles, Article } from "@/app/lib/api/api";
import Image from "next/image";
import Dropdown from "../ui/Dropdown";

export default function AllPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortOption, setSortOption] = useState<"recent" | "favorite">("recent");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const fetchArticlesFromApi = async (
    query: string = "",
    page: number = 1
  ): Promise<void> => {
    try {
      const response = await fetchArticles({
        q: query,
        page,
        pageSize: 1000,
      });

      let filteredArticles = response.list;

      if (query) {
        filteredArticles = filteredArticles.filter((article) =>
          article.title.includes(query)
        );
      }
      setArticles(filteredArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    const query = searchParams.get("q") || "";
    fetchArticlesFromApi(query);
  }, [searchParams]);

  const handleSortSelection = (option: "recent" | "favorite"): void => {
    setSortOption(option);
    setCurrentPage(1);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = (): void => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  const getPaginatedArticles = (): Article[] => {
    const sortedArticles = [...articles].sort((a, b) => {
      if (sortOption === "favorite") {
        return b.likeCount - a.likeCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sortedArticles.slice((currentPage - 1) * 10, currentPage * 10);
  };

  const paginatedArticles = getPaginatedArticles();

  return (
    <div className="container">
      <div className={styles.titleContainer}>
        <div className={styles.sectionTitle}>게시글</div>
        <Link href="/addboard" className={styles.addPostLink}>
          글쓰기
        </Link>
      </div>
      <div className={styles.searchDropdown}>
        <SearchInput
          placeholder="게시글 검색"
          onSearch={(value) => {
            setCurrentPage(1);
            router.push(
              value.trim()
                ? `/boards?q=${encodeURIComponent(value)}`
                : "/boards"
            );
          }}
        />
        <button className={styles.dropdownButton} onClick={toggleDropdown}>
          <Image width={30} height={30} src="/images/ic_sort.png" alt="정렬" />
        </button>
        {isDropdownVisible && (
          <Dropdown onSortSelection={handleSortSelection} />
        )}
      </div>

      <div className={styles.postsContainer}>
        {paginatedArticles.length > 0 ? (
          paginatedArticles.map((article) => (
            <Link
              key={article.id}
              href={`/boards/${article.id}`}
              className={styles.postLink}
            >
              <div className={styles.post}>
                <div className={styles.postContents}>
                  <h3 className={styles.title}>{article.title}</h3>
                  <div className={styles.imgContainer}>
                    <Image
                      src={article.image || "/images/default.png"}
                      alt={article.title || "default"}
                      width={48}
                      height={48}
                      className={styles.image}
                    />
                  </div>
                </div>
                <div className={styles.postFooter}>
                  <div className={styles.info}>
                    <p>{article.writer.nickname}</p>
                    <div className={styles.metaDate}>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
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
              </div>
            </Link>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          <Image
            width={20}
            height={20}
            src="/images/ic_left.png"
            alt="왼쪽 화살표"
          />
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            paginatedArticles.length < 10 || currentPage * 10 >= articles.length
          }
          className={styles.paginationButton}
        >
          <Image
            width={20}
            height={20}
            src="/images/ic_right.png"
            alt="오른쪽 화살표"
          />
        </button>
      </div>
    </div>
  );
}
