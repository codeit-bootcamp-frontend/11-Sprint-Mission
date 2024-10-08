import React, { useEffect, useState } from "react";
import { showInitialDeviceItems } from "utils/initialDevice ";

function Pagenation({ totalCount = 0, pageChange }) {
  const [page, setPage] = useState(1);
  const [pagenation, setPagenation] = useState([1, 2, 3, 4, 5]);
  const showPageCount = showInitialDeviceItems();

  const handleChangePage = (pageNum) => {
    setPage(pageNum);
    pageChange(pageNum);
  };

  const handlePrevPage = () => {
    let firstPage = pagenation[0];
    if (firstPage / 5 > 1) {
      const decreasePagenation = pagenation.map((num) => num - 5);

      if (decreasePagenation.length < 5) {
        for (let i = 1; i <= 5; i++) {
          if (decreasePagenation.length !== 5) {
            decreasePagenation.push(decreasePagenation[0] + i);
          }
        }
      }
      setPagenation(decreasePagenation);
      handleChangePage(decreasePagenation[0]);
    }
  };

  const handleNextPage = () => {
    const lastPage = pagenation[pagenation.length - 1];
    if (lastPage * showPageCount < totalCount) {
      // totalcount 보다 작은 페이지만 필터링
      const increasePagenation = pagenation
        .map((num) => num + 5)
        .filter((num) => {
          return Math.ceil(totalCount / showPageCount) >= num;
        });
      setPagenation(increasePagenation);
      handleChangePage(increasePagenation[0]);
    }
  };

  useEffect(() => {
    const lastPagenation = Math.ceil(totalCount / showPageCount);
    setPagenation(Array.from({ length: lastPagenation > 5 ? 5 : lastPagenation }, (_, i) => i + 1));
  }, [showPageCount, totalCount]);

  return (
    <div className="pagenation">
      <button className={"pagenationBtn"} key={`pevPageBtn`} onClick={handlePrevPage}>
        {`<`}
      </button>
      {pagenation.map((num, idx) => {
        return (
          <button
            className={`pagenationBtn ${page === num ? "pagenationBtnSelect" : ""}`}
            id={`pageBtn${idx}`}
            key={`pageBtn${idx}`}
            onClick={() => {
              handleChangePage(num);
            }}>
            {num}
          </button>
        );
      })}
      <button className={"pagenationBtn"} key={`nextPageBtn`} onClick={handleNextPage}>
        {`>`}
      </button>
    </div>
  );
}

export { Pagenation };
