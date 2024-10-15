import React from "react";

const Pagination = ({ page, totalPage, onNext, onPrev, onPageSelect }) => {
  const getPageNumber = () => {
    //페이지네이션 넘버링을 위한 계산
    const pageNumbers = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(start + 4, totalPage); //마지막 페이지가 5개묶음 도중 끝날경우 대비

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="pagination-button"
      >
        &lt;
      </button>
      {getPageNumber().map((number) => (
        <button
          key={number}
          onClick={() => onPageSelect(number)}
          className={
            number === page ? "pagination-active" : "pagination-inactive"
          }
        >
          {number}
        </button>
      ))}
      <button
        onClick={onNext}
        disabled={page === totalPage}
        className="pagination-button"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
