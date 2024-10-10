// Pagination.js
import React from "react";

function Pagination({ currentPage, totalPageNum, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPageNum; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? "active" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === totalPageNum}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
