import styled from 'styled-components';

const ICON_ARROW = '/ic-arrow.svg';

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

const StyledPagination = styled.div`
  display: flex;
  gap: 0.4rem;
  margin: 4rem 0;
  justify-content: center;

  .pagination {
    &-item {
      cursor: pointer;
      width: 4rem;
      height: 4rem;
      text-align: center;
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 4rem;
      color: var(--gray-500);
      background-color: #fff;
      border: 1px solid var(--gray-200);
      border-radius: 50rem;
      &.active {
        background-color: #2f80ed;
        border: none;
        color: #fff;
      }
    }
  }

  [class*='arrow-'] {
    background-image: url(${ICON_ARROW});
    background-repeat: no-repeat;
    background-size: 1.6rem;
    background-position: center;
  }
  .arrow {
    &-next {
      transform: rotate(180deg);
    }
  }
`;
