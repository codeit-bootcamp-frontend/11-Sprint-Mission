import React from "react";
import Left from "@/public/images/left.svg";
import Right from "@/public/images/right.svg";
import "../../styles/Pagination.module.css";
import Image from "next/image";

interface PaginationProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNum: number) => void;
}

export default function Pagination({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 5;
  let startPage: number;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="pagination">
      <button
        className="paginationBtn"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <Image src={Left} alt="Previous" width={40} height={40} />
        {/* <Image src="/images/left.svg" alt="Previous" width={40} height={40} /> */}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`paginationButton ${
            activePageNum === page ? "active" : ""
          }`}
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
        <Image src={Right} alt="Next" width={40} height={40} />
        {/* <Image src="/images/right.svg" alt="Next" width={40} height={40} /> */}
      </button>
    </div>
  );
}
