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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortOption, setSortOption] = useState<string>("recent");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const fetchArticlesFromApi = async (query: string = "") => {
    try {
      const response = await fetchArticles({
        q: query,
        page: 1,
        pageSize: 10,
      });
      setArticles(response.list);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
    fetchArticlesFromApi(query);
  }, [searchParams]);

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortOption === "favorite") {
      return b.likeCount - a.likeCount;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const filteredArticles = sortedArticles.filter((article) =>
    article.title.includes(searchQuery)
  );

  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      router.push("/boards");
    } else {
      router.push(`/boards?q=${encodeURIComponent(value)}`);
    }
  };

  const handleSortSelection = (option: string) => {
    setSortOption(option);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="container">
      <div className={styles.titleContainer}>
        <div className={styles.sectionTitle}>게시글</div>
        <Link href="/addPost" className={styles.addPostLink}>
          글쓰기
        </Link>
      </div>
      <div className={styles.serachDropdown}>
        <SearchInput placeholder="게시글 검색" onSearch={handleSearch} />
        <button className={styles.dropdownButton} onClick={toggleDropdown}>
          <Image width={30} height={30} src="/images/ic_sort.png" alt="정렬" />
        </button>
        {isDropdownVisible && (
          <Dropdown onSortSelection={handleSortSelection} />
        )}
      </div>

      <div className={styles.postsContainer}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className={styles.post}>
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
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
