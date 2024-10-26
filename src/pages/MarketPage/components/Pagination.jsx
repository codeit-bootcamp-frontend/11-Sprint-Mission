import React from "react";
// import { ReactComponent as LeftArrow } from "../../assets/images/icons/arrow_left.svg";
// import { ReactComponent as RightArrow } from "../../assets/images/icons/arrow_right.svg";

const Pagination = ({ totalPageNum, activePageNum, onPageChange }) => {
  const maxVisiblePages = 5;
  let startPage = 1;

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="paginationBar">
      <button
        className="paginationButton"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        Prev {/* <LeftArrow /> */}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`paginationButton ${activePageNum === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="paginationButton"
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        Next {/* <RightArrow /> */}
      </button>
    </div>
  );
};

export default Pagination;
