"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./AllPost.module.css";
import SearchInput from "@/app/components/ui/SearchInput";

export default function AllPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (value: string) => {
    router.push(`/boards?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="container">
      <div className={styles.titleContainer}>
        <div className={styles.sectionTitle}>게시글</div>
        <Link href="/addPost" className={styles.addPostLink}>
          글쓰기
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <SearchInput placeholder="게시글 검색" onSearch={handleSearch} />
      </div>

      <div className={styles.postsContainer}>
        {searchQuery ? (
          <p>검색어: {searchQuery}에 대한 결과를 여기에 표시합니다.</p>
        ) : (
          <p>전체 게시글을 여기에 표시합니다.</p>
        )}
      </div>
    </div>
  );
}
