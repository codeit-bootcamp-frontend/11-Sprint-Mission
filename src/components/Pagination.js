import React from "react";
import "./pagination.css";
import prevIcon from "../assets/arrow_left.svg";
import nextIcon from "../assets/arrow_right.svg";

function Pagination({ currentPage, totalPageNum, onPageChange }) {
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
    <div className="pagination">
      <button disabled={startPage === 1} onClick={goToPreviousGroup}>
        <img src={prevIcon} alt="이전 버튼" />
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
      <button disabled={endPage === totalPageNum} onClick={goToNextGroup}>
        <img src={nextIcon} alt="다음 버튼" />
      </button>
    </div>
  );
}

export default Pagination;
