import { useEffect, useState } from "react";
import { getProducts } from "../../api";
import Item from "../Item/Item";
import "./ItemList.css";
import Pagination from "../Pagination/Pagination";
import arrowDown from "../../assets/images/ic_arrow_down.svg";
import ic_sort from "../../assets/images/ic_sort.svg";
import ic_search from "../../assets/images/ic_search.svg";
import { useDeviceType } from "../../contexts/DeviceTypeContext";
import { Link } from "react-router-dom";

const PAGE_SIZE = {
  desktop: 12,
  tablet: 6,
  mobile: 4,
};

/**
 * 전체 상품 리스트 컴포넌트다.
 * 키워드 검색, 상품 등록, 조건 검색 기능을 제공한다.
 * @returns 리스트 컴포넌트
 */
function ItemList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("recent");
  const [total, setTotal] = useState(0);
  const deviceType = useDeviceType();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts(page, PAGE_SIZE[deviceType], order);
      setItems(result.list);
      setTotal(result.totalCount);
    };
    fetchData();
  }, [deviceType, page, order]);

  return (
    <div className="ItemList">
      <Header deviceType={deviceType} order={order} setOrder={setOrder} />
      <Content items={items} />
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={PAGE_SIZE[deviceType]}
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
function Header({ deviceType, order, setOrder }) {
  if (deviceType !== "mobile") {
    return (
      <div className="ItemList-header">
        <h2 className="title">전체 상품</h2>
        <div className="utils">
          <Search />
          <Link className="btn-add" to="/additem">
            <span>상품 등록하기</span>
          </Link>
          <Select deviceType={deviceType} order={order} setOrder={setOrder} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="ItemList-header">
        <div className="mobile-wrap">
          <h2 className="title">전체 상품</h2>
          <Link className="btn-add" to="/additem">
            <span>상품 등록하기</span>
          </Link>
        </div>
        <div className="mobile-wrap">
          <Search />
          <Select deviceType={deviceType} order={order} setOrder={setOrder} />
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

function Select({ deviceType, order, setOrder }) {
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
      {deviceType !== "mobile" ? (
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
