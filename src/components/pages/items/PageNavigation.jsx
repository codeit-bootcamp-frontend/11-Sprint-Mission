const PageNavigation = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClick = (e) => {
    onPageChange(+e.target.value);
  };

  const handleNextClick = () => {
    if (currentPage < endPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <footer className="items-footer">
      <nav className="page-nav">
        <ul className="page-nav-ul">
          <li>
            <button
              className="page-btn page-move-btn"
              onClick={handlePreviousClick}
              disabled={currentPage === 1}
            >
              <img
                src="images/icons/ic_arrow_right.svg"
                alt="이전 페이지 이동"
              />
            </button>
          </li>
          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const page = startPage + index;

            return (
              <li key={page}>
                <button
                  className={`page-btn ${
                    page === currentPage ? "current-page" : ""
                  }`}
                  value={page}
                  onClick={handlePageClick}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li>
            <button
              className="page-btn page-move-btn"
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
            >
              <img
                className="arrow-rotated"
                src="images/icons/ic_arrow_right.svg"
                alt="다음 페이지 이동"
              />
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default PageNavigation;
