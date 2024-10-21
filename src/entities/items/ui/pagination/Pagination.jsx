import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, currentPage, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={totalPages} // 총 페이지 수를 설정
      marginPagesDisplayed={0} // 양쪽에 표시할 페이지 수
      pageRangeDisplayed={5} // 현재 페이지 기준으로 표시할 페이지 수
      onPageChange={handlePageClick} // 페이지가 변경될 때 호출되는 함수
      forcePage={currentPage - 1} // 현재 페이지 상태를 강제로 유지
      containerClassName={"flex justify-center items-center space-x-2 mt-10"} // 페이지네이션 컨테이너를 가로로 정렬
      pageClassName={"page-item"} // 페이지 항목 클래스
      pageLinkClassName={"page-link px-3 py-1 border rounded"} // 페이지 링크 클래스 (버튼 스타일 추가)
      previousClassName={"page-item"}
      previousLinkClassName={"page-link px-3 py-1 border rounded"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link px-3 py-1 border rounded"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link px-3 py-1 border rounded"}
      activeClassName={"active bg-blue-500 text-white"} // 활성화된 페이지 클래스
    />
  );
};

export default Pagination;
