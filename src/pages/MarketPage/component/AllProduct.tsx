import React from "react";
import { Link } from "react-router-dom";
// import SortIcon from "../images/ic_sort.svg";
import { ReactComponent as SearchIcon } from "../../../images/ic_search.svg";
import Dropdown from "../../../component/Dropdown";
import "./AllProduct.css";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/api";
import Pagination from "../../../component/Pagination";

// 화면 사이즈
const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // 모바일
    return 4;
  } else if (width < 1280) {
    // 태블릿
    return 6;
  } else {
    // pc
    return 10;
  }
};

function AllProduct() {
  const [orderBy, setOrderBy] = useState("recent");
  const [itemList, setItemList] = useState([]);
  // const pageSize = 4;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [totalPageNum, setTotalPageNum] = useState();

  const sortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, page, pageSize });
    setItemList(products.list);
    setTotalPageNum(Math.ceil(products.totalCount / pageSize));
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  // useEffect(() => {
  //   sortedData({ orderBy: "favorite", pageSize });
  // }, []);
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    sortedData({ orderBy, page, pageSize });
  }, [orderBy, page, pageSize]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="allItemsContainer">
      <h1>판매 중인 상품</h1>

      <div className="productHeader">
        <Link to="/additem" className="addBtn">
          상품 등록하기
        </Link>

        <div className="search">
          <SearchIcon />
          <input
            className="searchInput"
            placeholder="검색할 상품을 입력해 주세요"
          />
        </div>

        <Dropdown onSortSelection={handleSortSelection} />
      </div>

      <div>
        {itemList &&
          itemList?.map((item) => (
            <ItemCard item={item} key={`all-item-${item.id}`} />
          ))}
      </div>

      <div>
        <Pagination
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AllProduct;
