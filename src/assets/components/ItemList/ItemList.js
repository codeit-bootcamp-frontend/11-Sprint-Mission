import { useEffect, useState } from "react";
import { getProducts } from "../../../api";
import Item from "../Item/Item";
import "./ItemList.css";
import Pagination from "../Pagination/Pagination";

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

  const handleAddClick = (e) => {
    window.location.href = window.location.origin + "/additem";
  };

  return (
    <div className="ItemList-header">
      <h2 className="title">전체 상품</h2>
      <div className="utils">
        <input className="search" placeholder="검색할 상품을 입력해주세요" />
        <button className="btn-add" onClick={handleAddClick}>
          상품 등록하기
        </button>
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

export default ItemList;
