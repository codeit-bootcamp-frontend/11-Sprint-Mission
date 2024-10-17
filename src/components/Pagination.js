import React from 'react';
import '../styles/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const maxPageNumbers = 5; // 처음 보여줄 페이지 번호 수
  const startPage =
    Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  // 페이지 번호 동적으로 생성
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &lt;
      </button>

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`pagination-number ${
            currentPage === pageNumber ? 'active' : ''
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
