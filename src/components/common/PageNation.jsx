import "./PageNation.scss";

const PageNation = ({ total, pageSize, setCurrentPage, currentPage }) => {
  const totalPageNum = Math.ceil(total / pageSize);
  const maxVisiblePages = 5;

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleArrowNextClick = () => {
    currentPage < totalPageNum
      ? setCurrentPage(currentPage + 1)
      : alert("마지막 페이지 입니다.");
  };
  const handleArrowPrevClick = () => {
    currentPage > 1
      ? setCurrentPage(currentPage - 1)
      : alert("처음 페이지 입니다.");
  };

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPageNum) {
      endPage = totalPageNum;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <ul className='pagination'>
      <li
        className='pagination-item arrow-prev'
        onClick={handleArrowPrevClick}
      ></li>
      {pages.map((page) => (
        <li
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagination-item ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </li>
      ))}
      <li
        className='pagination-item arrow-next'
        onClick={handleArrowNextClick}
      ></li>
    </ul>
  );
};

export default PageNation;
