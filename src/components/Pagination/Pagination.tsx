import "./Pagination.css";
import arrowLeft from "../../assets/images/arrow_left.svg";
import arrowRight from "../../assets/images/arrow_right.svg";
import arrowLeftDouble from "../../assets/images/arrow_left_double.svg";
import arrowRightDouble from "../../assets/images/arrow_right_double.svg";

function getPageButtonRange(page: number, lastPage: number) {
  // 표시할 최대 버튼 수
  const RANGE_WIDTH = 5;
  const RANGE_WIDTH_HALF = 2;
  const range = [];
  let begin = 1;
  let end = 1;

  if (lastPage < RANGE_WIDTH) {
    // 전체 페이지 수가 버튼 범위 보다 적은 경우
    begin = 1;
    end = lastPage;
  } else if (lastPage < page + RANGE_WIDTH_HALF) {
    // 이후 페이지가 범위의 반보다 적은 경우
    end = lastPage;
    begin = lastPage - RANGE_WIDTH + 1;
  } else if (1 > page - RANGE_WIDTH_HALF) {
    // 이전 페이지가 범위의 반보다 적은 경우
    begin = 1;
    end = RANGE_WIDTH;
  } else {
    begin = page - RANGE_WIDTH_HALF;
    end = page + RANGE_WIDTH_HALF;
  }
  for (let i = begin; i <= end; i++) {
    range.push(i);
  }
  return range;
}

function Pagination({
  page,
  setPage,
  pageSize,
  total,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  total: number;
}) {
  // 마지막 페이지 번호
  const lastPage = Math.ceil(total / pageSize);
  const prev = page - 1;
  const next = page + 1;
  // 표시할 버튼 번호 배열
  const range = getPageButtonRange(page, lastPage);

  const handlePageClick = (event: React.MouseEvent<HTMLUListElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      alert("페이지 선택 중 오류가 발생했습니다!");
      return;
    }

    const data = event.target.dataset.page;

    const targetPage = Number(data);
    if (!targetPage) {
      console.log("paginattion err 1");
      return;
    }
    if (targetPage < 1) return;
    if (targetPage > lastPage) return;
    setPage(targetPage);
  };

  return (
    <ul className="Pagination" onClick={handlePageClick}>
      <li className="page-btn-first">
        <button data-page={String(1)}>
          <img src={arrowLeftDouble} alt="첫 페이지" />
        </button>
      </li>
      <li>
        <button data-page={String(prev)}>
          <img src={arrowLeft} alt="이전 페이지" />
        </button>
      </li>
      {range.map((e) => (
        <li key={e}>
          <PageButton page={e} current={page} />
        </li>
      ))}
      <li>
        <button data-page={String(next)}>
          <img src={arrowRight} alt="다음 페이지" />
        </button>
      </li>
      <li className="page-btn-last">
        <button data-page={String(lastPage)}>
          <img src={arrowRightDouble} alt="끝 페이지" />
        </button>
      </li>
    </ul>
  );
}

function PageButton({ page, current }: { page: number; current: number }) {
  const isCurrent = page === current ? "current" : "";
  return (
    <button className={isCurrent} data-page={String(page)}>
      {page}
    </button>
  );
}

export default Pagination;
