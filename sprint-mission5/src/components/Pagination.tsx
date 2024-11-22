import "./Pagination.css";
import LeftArrow from "../images/pagination/left_arrow.png";
import RightArrow from "../images/pagination/right_arrow.png";
import classNames from "classnames";

// PaginationProps로 인터페이스 이름 수정 (명확히 타입 지정)
interface PaginationProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationProps) => {
  const maxVisiblePages = 5;
  let startPage: number;

  // 페이지 계산 로직
  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  // 페이지 배열 생성
  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <nav className="pagination-wrap">
      <button
        className="pagin-btn"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <img src={LeftArrow} alt="왼쪽버튼" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={classNames("pagin-btn", {
            active: activePageNum === page,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagin-btn"
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <img src={RightArrow} alt="오른쪽버튼" />
      </button>
    </nav>
  );
};

export default Pagination;
