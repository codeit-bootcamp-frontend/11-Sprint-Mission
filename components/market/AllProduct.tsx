import React from "react";
import Link from "next/link";
// import SortIcon from "../images/ic_sort.svg";
import SearchIcon from "../..//../public/images/ic_search.svg";
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

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
}

function AllProduct() {
  const [orderBy, setOrderBy] = useState("recent");
  const [itemList, setItemList] = useState<Product[]>([]);
  // const pageSize = 4;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [totalPageNum, setTotalPageNum] = useState<number>();

  const sortedData = async ({
    orderBy,
    page,
    pageSize,
  }: {
    orderBy: string;
    page: number;
    pageSize: number;
  }) => {
    const products = await getProducts(orderBy, page, pageSize); // 객체로 전달하면 안됨?
    setItemList(products.list);
    setTotalPageNum(Math.ceil(products.totalCount / pageSize) || 1); // 기본값을 1로 설정
  };

  const handleSortSelection = (sortOption: string) => {
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

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="allItemsContainer">
      <h1>판매 중인 상품</h1>

      <div className="productHeader">
        <Link href="/additem" className="addBtn">
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
          totalPageNum={totalPageNum ?? 1}
          // totalPageNum이 undefined일 경우 1을 기본값으로 설정
          // ??: 널 병합 연산자, null 또는 undefined 값을 처리할 때 사용, 두 개의 값 중 첫 번째 값이 null 또는 undefined일 경우 두 번째 값을 반환 + 그렇지 않으면 첫 번째 값을 그대로 반환
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AllProduct;
