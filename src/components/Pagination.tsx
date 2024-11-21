import React from 'react';
import styles from '../styles/Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: any;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];
  const maxPageNumbers = 5; // 한 번에 보여줄 최대 페이지 번호 수
  const startPage =
    Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  // 페이지 번호 동적으로 생성
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      {/* 처음 페이지로 이동 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        &lt;&lt;
      </button>

      {/* 이전 페이지 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        &lt;
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`${styles.paginationNumber} ${
            currentPage === pageNumber ? styles.active : ''
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        &gt;
      </button>

      {/* 마지막 페이지로 이동 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        &gt;&gt;
      </button>
    </div>
  );
}

export default Pagination;
