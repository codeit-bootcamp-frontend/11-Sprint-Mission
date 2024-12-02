import React from "react";
import styles from "@/styles/pagination.module.css";
import prevIcon from "@/public/svgs/arrow_left.svg";
import nextIcon from "@/public/svgs/arrow_right.svg";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPageNum: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPageNum,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];
  const maxVisiblePages = 5; // 한 번에 표시할 최대 페이지 수

  // 현재 페이지가 속한 페이지 그룹 계산
  const currentGroup = Math.floor((currentPage - 1) / maxVisiblePages);
  const startPage = currentGroup * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPageNum);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 다음 5개로 이동하는 함수
  const goToNextGroup = () => {
    const nextGroupPage = startPage + maxVisiblePages;
    if (nextGroupPage <= totalPageNum) {
      onPageChange(nextGroupPage);
    }
  };

  // 이전 5개로 이동하는 함수
  const goToPreviousGroup = () => {
    const prevGroupPage = startPage - maxVisiblePages;
    if (prevGroupPage > 0) {
      onPageChange(prevGroupPage);
    }
  };

  return (
    <div className={styles.pagination}>
      <button disabled={startPage === 1} onClick={goToPreviousGroup}>
        <Image src={prevIcon} alt="이전 버튼" width={16} height={16} />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? styles.active : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button disabled={endPage === totalPageNum} onClick={goToNextGroup}>
        <Image src={nextIcon} alt="다음 버튼" width={16} height={16} />
      </button>
    </div>
  );
}

export default Pagination;
