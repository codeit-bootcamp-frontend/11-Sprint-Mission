import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import './Pagination.css';

export default function Pagination({ page = 1, pageSize = 10, totalCount = 0, onClick, className = '' }) {
  const getPages = () => {
    let count = 1;
    const pageCount = totalCount ? Math.ceil(totalCount / pageSize) : 1;
    return Array(pageCount)
      .fill(0)
      .map((num) => num + count++);
  };

  const pagesLength = getPages().length;

  const handleClick = (nextPageNum) => {
    return () => onClick(nextPageNum);
  };

  return (
    <ul className={`pagination ${className}`}>
      <li>
        <button className="btn-pn" type="button" onClick={handleClick(page - 1)} disabled={page === 1}>
          <ChevronLeftIcon className="size-4 mx-auto" />
        </button>
      </li>
      {getPages().map((pageNum) => (
        <li key={pageNum}>
          <button className={`btn-pn ${page === pageNum ? 'active' : ''}`} type="button" onClick={handleClick(pageNum)}>
            {pageNum}
          </button>
        </li>
      ))}
      <li>
        <button className="btn-pn" type="button" onClick={handleClick(page + 1)} disabled={page === pagesLength}>
          <ChevronRightIcon className="size-4 mx-auto" />
        </button>
      </li>
    </ul>
  );
}
