import React from "react";

const PAGES_PER_SHOW = 5; // 페이지 네이션에 표시할 페이지 수

function Paginations({ totalPage, currentPage, handlePageChange }) {
  const currentGroup = Math.ceil(currentPage / PAGES_PER_SHOW); // 페이지 그룹
  const startPage = (currentGroup - 1) * PAGES_PER_SHOW + 1; // 첫 페이지
  const endPage = Math.min(startPage + PAGES_PER_SHOW - 1, totalPage); // 마지막 페이지

  /**
   * 이전 그룹으로 이동
   */
  const handlePrevGroup = () => {
    if (startPage > 1) {
      handlePageChange(startPage - 1); // 이전 페이지 그룹 마지막으로 이동
    }
  };

  /**
   * 다음 그룹으로 이동
   */
  const handleNextGroup = () => {
    if (endPage < totalPage) {
      handlePageChange(endPage + 1); // 다음 페이지 그룹 첫 번째로 이동
    }
  };

  return (
    <div className="pagination">
      <button
        className="btn-pagination btn-prev"
        onClick={handlePrevGroup}
        disabled={startPage === 1} // 첫 번째 그룹인 경우 이전 버튼 비활성화
      >
        <span className="sr-only">이전</span>
      </button>

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, idx) => startPage + idx
      ).map((page) => (
        <button
          key={`pagination_${page}`} // key props이 숫자라 pagination_ 추가
          className="btn-pagination"
          active={page === currentPage ? "active" : null} // 현재 페이지 active 처리
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage} // active 페이지인 경우 버튼 클릭 막음
        >
          {page}
        </button>
      ))}

      {/* 다음 그룹으로 이동 */}
      <button
        className="btn-pagination btn-next"
        onClick={handleNextGroup}
        disabled={endPage === totalPage} // 마지막 페이지인 경우 다음 버튼 비활성화
      >
        <span className="sr-only">다음</span>
      </button>
    </div>
  );
}

export default Paginations;
