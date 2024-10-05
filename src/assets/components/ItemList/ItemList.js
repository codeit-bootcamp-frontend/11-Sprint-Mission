import { useEffect, useState } from "react";
import { getProducts } from "../../../api";
import Item from "../Item/Item";
import "./ItemList.css";
import arrowLeft from "../../images/arrow_left.svg";
import arrowRight from "../../images/arrow_right.svg";
import arrowLeftDouble from "../../images/arrow_left_double.svg";
import arrowRightDouble from "../../images/arrow_right_double.svg";

/**
 * 전체 상품 리스트 컴포넌트다.
 * 키워드 검색, 상품 등록, 조건 검색 기능을 제공한다.
 * @returns 리스트 컴포넌트
 */
function ItemList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [order, setOrder] = useState("recent");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts(page, pageSize, order);
      setItems(result.list);
      setTotal(result.totalCount);
    };
    fetchData();
  }, [page, pageSize, order]);

  return (
    <div className="ItemList">
      <Header setOrder={setOrder} />
      <Content items={items} />
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        total={total}
      />
    </div>
  );
}

/**
 * 전체 상품 페이지의 헤더 컴포넌트
 * @param {Function} setOrder 정렬 조건 세터 함수
 * @returns 헤더 컴포넌트
 * @description 여러 유틸 기능을 포함한 헤더. 키워드 검색, 상품 등록, 검색 조건 셀렉터를 포함하고 있다.
 */
function Header({ setOrder }) {
  const handleSelectChange = (e) => {
    const opt = e.target.options;
    const selected = opt[opt.selectedIndex].value;
    setOrder(selected);
  };

  return (
    <div className="ItemList-header">
      <h2 className="title">전체 상품</h2>
      <div className="utils">
        <input className="search" placeholder="검색할 상품을 입력해주세요" />
        <button className="btn-add">상품 등록하기</button>
        <select className="select-order" onChange={handleSelectChange}>
          <option value={"recent"}>최신순</option>
          <option value={"favorite"}>좋아요순</option>
        </select>
      </div>
    </div>
  );
}

/**
 * 상품 배열을 리스트로 보여주는 컴포넌트
 * @param {Object} items 상품 배열 객체
 * @returns 상품 리스트 컴포넌트
 */
function Content({ items }) {
  return (
    <ul className="ItemList-content">
      {items.map((item) => (
        <li key={item.id}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  );
}

/**
 * 렌더링할 페이지 번호 배열을 반환하는 함수
 * @param {Number} page 현재 페이지 번호
 * @param {Number} lastPage 마지막 페이지 번호
 * @return {Object} 렌더링할 버튼의 번호가 든 배열
 */
function getPageButtonRange(page, lastPage) {
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

/**
 *페이지네이션 컴포넌트
 * @param {Number} page 현재 페이지 번호
 * @param {Function} setPage 페이지 세터 함수
 * @param {Number} pageSize 페이지당 상품 수
 * @param {Number} total 총 상품 수
 * @returns 페이지네이션 컴포넌트 반환
 */
function Pagination({ page, setPage, pageSize, total }) {
  // 마지막 페이지 번호
  const lastPage = Math.round(total / pageSize) + (total % pageSize > 0);
  // 표시할 버튼 번호 배열
  const range = getPageButtonRange(page, lastPage);

  /**
   * 페이지네이션 버튼 클릭 이벤트핸들러
   * @param {Event} e 이벤트 객체
   * @description 클릭한 버튼의 value 속성에 해당하는 페이지로 이동
   */
  const handlePageClick = (e) => {
    const targetPage = Number(e.target.value);
    if (!targetPage) return;
    if (targetPage < 1) return;
    if (targetPage > lastPage) return;
    setPage(targetPage);
  };

  return (
    <ul className="Pagination" onClick={handlePageClick}>
      <li>
        <button value={1}>
          <img src={arrowLeftDouble} alt="첫 페이지" />
        </button>
      </li>
      <li>
        <button value={page - 1}>
          <img src={arrowLeft} alt="이전 페이지" />
        </button>
      </li>
      {range.map((e) => (
        <li key={e}>
          <PageButton page={e} current={page} />
        </li>
      ))}
      <li>
        <button value={page + 1}>
          <img src={arrowRight} alt="다음 페이지" />
        </button>
      </li>
      <li>
        <button value={lastPage}>
          <img src={arrowRightDouble} alt="끝 페이지" />
        </button>
      </li>
    </ul>
  );
}

/**
 * 페이지를 이동할 수 있는 버튼 컴포넌트
 * @param {Number} page 이 버튼에 해당하는 페이지
 * @param {Number} current 현재 사용자가 보고 있는 페이지
 * @returns 버튼 컴포넌트
 * @description 현재 페이지와 컴포넌트가 가리키는 페이지가 일치할 경우 강조된 버튼 반환
 */
function PageButton({ page, current }) {
  const isCurrent = page === current ? "current" : "";
  return (
    <button className={isCurrent} value={page}>
      {page}
    </button>
  );
}

export default ItemList;
