import { useEffect, useState } from "react";
import { getProducts } from "../../../api";
import Item from "../Item/Item";
import "./ItemList.css";
import Pagination from "../Pagination/Pagination";
import arrowDown from "../../images/ic_arrow_down.svg";
import ic_sort from "../../images/ic_sort.svg";
import ic_search from "../../images/ic_search.svg";

/**
 * 전체 상품 리스트 컴포넌트다.
 * 키워드 검색, 상품 등록, 조건 검색 기능을 제공한다.
 * @returns 리스트 컴포넌트
 */
function ItemList({ view }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState();
  const [order, setOrder] = useState("recent");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    switch (view) {
      case "mobile":
        setPageSize(4);
        break;
      case "tablet":
        setPageSize(6);
        break;
      default:
        setPageSize(12);
    }
  }, [view]);

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
      <Header view={view} order={order} setOrder={setOrder} />
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
function Header({ view, order, setOrder }) {
  const handleAddClick = () => {
    window.location.href = window.location.origin + "/additem";
  };

  if (view !== "mobile") {
    return (
      <div className="ItemList-header">
        <h2 className="title">전체 상품</h2>
        <div className="utils">
          <Search />
          <button className="btn-add" onClick={handleAddClick}>
            상품 등록하기
          </button>
          <Select view={view} order={order} setOrder={setOrder} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="ItemList-header">
        <div className="mobile-wrap">
          <h2 className="title">전체 상품</h2>
          <button className="btn-add" onClick={handleAddClick}>
            상품 등록하기
          </button>
        </div>
        <div className="mobile-wrap">
          <Search />
          <Select view={view} order={order} setOrder={setOrder} />
        </div>
      </div>
    );
  }
}

function Search() {
  return (
    <form className="search-form">
      <img src={ic_search} alt="검색" />
      <input placeholder="검색할 상품을 입력해주세요" />
    </form>
  );
}

function Select({ view, order, setOrder }) {
  const handleSelectClick = (e) => {
    e.currentTarget.querySelector(".option-wrap").classList.toggle("show");
  };

  const handleSelectChange = (e) => {
    const orderBy = e.target.dataset.order;
    if (orderBy) {
      setOrder(orderBy);
    }
  };

  return (
    <div className="select-order" onClick={handleSelectClick}>
      {view !== "mobile" ? (
        <>
          <p>{order === "recent" ? "최신순" : "좋아요순"}</p>
          <img src={arrowDown} alt="▼" />
        </>
      ) : (
        <img src={ic_sort} alt="▼" />
      )}
      <div className="option-wrap" onClick={handleSelectChange}>
        <div className="option" data-order="recent">
          최신순
        </div>
        <div className="option" data-order="favorite">
          좋아요순
        </div>
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
