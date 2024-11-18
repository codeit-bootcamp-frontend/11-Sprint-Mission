import StyledPagination from './PageNation.styles';

interface PageNationProps {
  total: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

function PageNation({
  total,
  pageSize,
  setCurrentPage,
  currentPage,
}: PageNationProps) {
  const totalPageNum = Math.ceil(total / pageSize);
  const maxVisiblePages = 5;

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleArrowNextClick = () => {
    if (currentPage < totalPageNum) {
      setCurrentPage(currentPage + 1);
    } else {
      alert('마지막 페이지 입니다.');
    }
  };

  const handleArrowPrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      alert('처음 페이지 입니다.');
    }
  };

  const getPageNumbers = (): number[] => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPageNum) {
      endPage = totalPageNum;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <StyledPagination>
      <li
        className='pagination-item arrow-prev'
        onClick={handleArrowPrevClick}
        aria-label='Previous Page'
      />
      {pages.map((page) => (
        <li
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagination-item ${page === currentPage ? 'active' : ''}`}
          aria-label={`Page ${page}`}>
          {page}
        </li>
      ))}
      <li
        className='pagination-item arrow-next'
        onClick={handleArrowNextClick}
        aria-label='Next Page'
      />
    </StyledPagination>
  );
}

export default PageNation;
