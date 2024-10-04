import "../styles/PageNation/PageNation.css";

const PageNation = ({ total, pageSize, setCurrentPage, currentPage }) => {
  const totalPageNum = Math.ceil(total / pageSize);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleArrowNextClick = () => {
    currentPage < totalPageNum ? setCurrentPage(currentPage + 1) : alert("마지막 페이지 입니다.");
  };
  const handleArrowPrevClick = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 1) : alert("이전 페이지가 없습니다.");
  };
  return (
    <ul className='pagination'>
      <li className='pagination-item arrow-prev' onClick={handleArrowPrevClick}></li>
      {Array.from({ length: totalPageNum }, (_, i) => (
        <li
          key={i + 1}
          onClick={() => handlePageClick(i + 1)}
          className={`pagination-item ${i + 1 === currentPage ? "active" : ""}`}
        >
          {i + 1}
        </li>
      ))}
      <li className='pagination-item arrow-next' onClick={handleArrowNextClick}></li>
    </ul>
  );
};

export default PageNation;
