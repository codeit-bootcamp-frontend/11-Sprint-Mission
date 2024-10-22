import { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({ page, pageSize, totalPosts, setPage }) {
  //pageSize : 한 페이지에 보여야 하는 갯수
  //page : 현재의 페이지
  //setPage : 변경될 page를 만드는 useStatePage
  //totalPasts : 데이터의 총 개수

  const numPages = Math.ceil(totalPosts / pageSize); // 전체 페이지 수 계산
  const [curGroup, setCurGroup] = useState(0);
  const [status, setStatus] = useState("");

  const pagesGroup = 5; //한 그룹에 5개 페이지
  const startPage = curGroup * pagesGroup + 1;
  const endPage = Math.min(startPage + pagesGroup - 1, numPages);

  const handlePrevBtn = () => {
    if (curGroup > 0) {
      setCurGroup(curGroup - 1);
    } 
  };

  const handleNextBtn = () => {
    if (endPage < numPages) {
      setCurGroup(curGroup + 1);
    }
  };

  return (
    <div className="Pagination">
      <button
        onClick={handlePrevBtn}
        disabled={curGroup === 0}
        className={`Pagination__btn ${curGroup === 0 ? 'disabled' : ''}`}
      >
        {"<"}
      </button>

      {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
        return (
          <button
            className={`Pagination__btn ${page === startPage + i ? 'active' : ''}`}
            key={startPage + i}
            onClick={() => setPage(startPage + i)}
          >
            {startPage + i}
          </button>
        );
      })}

      <button
        className={`Pagination__btn ${endPage >= numPages ? 'disabled' : ''}`}
        onClick={handleNextBtn}
        disabled={endPage >= numPages}
      >
        {">"}
      </button>

      {}
    </div>
  );
}

export default Pagination;
