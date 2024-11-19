interface Props {
  totalPage: number;
  currentPage: number;
  handlePageChange: (value: number) => void;
}

const PAGES_PER_SHOW = 5; // 페이지 네이션에 표시할 페이지 수

function Paginations({ totalPage, currentPage, handlePageChange }: Props) {
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
    <div className='pagination'>
      <button
        className='btn-pagination btn-prev'
        onClick={handlePrevGroup}
        disabled={startPage === 1} // 첫 번째 그룹인 경우 이전 버튼 비활성화
      >
        <span className='sr-only'>이전</span>
      </button>

      {/* {[...Array(endPage - startPage + 1).keys()].map((_, idx) => { */}
      {/* 'ArrayIterator<number>' 형식은 '--downlevelIteration' 
      플래그 또는 'es2015' 이상의 '--target'을 사용하는 경우에만
      반복할 수 있습니다. ts 에러 수정 위해 Array.from으로 수정 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
        const page = startPage + idx;
        return (
          <button
            key={`pagination_${page}`} // key props이 숫자라 pagination_ 추가
            // 'DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>'
            //  형식에 'active' 속성이 없습니다. ts 에러 수정 위해 클래스로 수정
            className={`btn-pagination ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage} // active 페이지인 경우 버튼 클릭 막음
          >
            {page}
          </button>
        );
      })}

      {/* 다음 그룹으로 이동 */}
      <button
        className='btn-pagination btn-next'
        onClick={handleNextGroup}
        disabled={endPage === totalPage} // 마지막 페이지인 경우 다음 버튼 비활성화
      >
        <span className='sr-only'>다음</span>
      </button>
    </div>
  );
}

export default Paginations;
