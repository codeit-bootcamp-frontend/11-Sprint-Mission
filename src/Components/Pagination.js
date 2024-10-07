import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import './Pagination.css';

// 전체 페이지네이션 배열 생성
function getPages(size, total) {
  let count = 1;
  const pageCount = total ? Math.ceil(total / size) : 1;
  return Array(pageCount)
    .fill(0)
    .map((num) => num + count++);
}

// 보여줄 페이지네이션 - 5개 배열 생성
function getShowPages(page, pages) {
  let indexStart = page - 3;
  let indexEnd = page + 2;

  if (indexStart < 0) {
    indexEnd = indexEnd - indexStart;
    indexStart = 0;
  } else if (indexEnd > pages.length) {
    indexStart = indexStart - (indexEnd - pages.length);
    indexEnd = pages.length;
  }

  return pages.slice(indexStart, indexEnd);
}

export default function Pagination({ page = 1, pageSize = 10, totalCount = 0, onClick, className = '' }) {
  const pages = getPages(pageSize, totalCount);
  const showPages = getShowPages(page, pages);

  // 페이지네이션 버튼 클릭
  const handleClick = (nextPage) => {
    return () => onClick(nextPage);
  };

  return (
    <ul className={`pagination ${className}`}>
      <li>
        <button className="btn-pn" type="button" onClick={handleClick(page - 1)} disabled={page === 1}>
          <ChevronLeftIcon className="size-4 mx-auto" />
        </button>
      </li>
      {showPages.map((pageNum) => (
        <li key={pageNum}>
          <button className={`btn-pn ${page === pageNum ? 'active' : ''}`} type="button" onClick={handleClick(pageNum)}>
            {pageNum}
          </button>
        </li>
      ))}
      <li>
        <button className="btn-pn" type="button" onClick={handleClick(page + 1)} disabled={page === pages.length}>
          <ChevronRightIcon className="size-4 mx-auto" />
        </button>
      </li>
    </ul>
  );
}
