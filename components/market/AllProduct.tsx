import React from "react";
import Link from "next/link";
// import SortIcon from "../images/ic_sort.svg";
import SearchIcon from "@/public/images/ic_search.svg";
// import Image from "next/image";
import Dropdown from "@/components/ui/Dropdown";
import "@/styles/AllProduct.module.css";
import { useEffect, useState } from "react";
import ItemCard from "@/components/market/ItemCard";
import { getProducts } from "@/api/api";
import Pagination from "@/components/ui/Pagination";
import { Product, ProductListResponse, ProductSortOption } from "@/types/Types";
import { useRouter } from "next/router";

// 화면 사이즈
const getPageSize = (width: number) => {
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

// 너비 추적
const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

const AllProduct = () => {
  const [orderBy, setOrderBy] = useState("recent");
  const [itemList, setItemList] = useState<Product[]>([]);
  // const pageSize = 4;
  const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(getPageSize());
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [totalPageNum, setTotalPageNum] = useState<number>();

  const sortOptions = [
    { key: "recent", label: "최신순" },
    { key: "favorite", label: "인기순" },
  ];

  // const sortedData = async ({
  //   orderBy,
  //   page,
  //   pageSize,
  // }: {
  //   orderBy: string;
  //   page: number;
  //   pageSize: number;
  // }) => {
  //   const products = await getProducts(orderBy, page, pageSize); // 객체로 전달하면 안됨?
  //   setItemList(products.list);
  //   setTotalPageNum(Math.ceil(products.totalCount / pageSize) || 1); // 기본값을 1로 설정
  // };

  // // useEffect(() => {
  // //   sortedData({ orderBy: "favorite", pageSize });
  // // }, []);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setPageSize(getPageSize());
  //   };

  //   // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
  //   window.addEventListener("resize", handleResize);
  //   sortedData({ orderBy, page, pageSize });
  // }, [orderBy, page, pageSize]);

  const router = useRouter();
  const viewportWidth = useViewport();

  // viewportWidth 값이 변경될 때마다 getPageSize 함수를 사용해 새로운 pageSize를 계산하고, 이전 값과 다를 경우 setPageSize를 호출하여 업데이트
  useEffect(() => {
    if (viewportWidth === 0) return; // viewportWidth의 초기 값 확인

    const newPageSize = getPageSize(viewportWidth);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  // pageSize 값이 변경될 때마다 데이터를 비동기로 가져오는 로직
  useEffect(() => {
    if (pageSize === null) return;

    const fetchSortedData = async () => {
      try {
        const data: ProductListResponse = await getProducts({
          orderBy: "favorite",
          page,
          pageSize,
        });
        setItemList(data.list);
        setTotalPageNum(Math.ceil(data.totalCount / pageSize));
      } catch (error) {
        console.error("오류: ", error);
      }
    };

    fetchSortedData();
  }, [orderBy, page, pageSize]);

  const handleSortSelection = (sortOption: ProductSortOption) => {
    setOrderBy(sortOption);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value); // 사용자가 입력한 검색어를 상태에 저장
  };

  const handleSearch = (searchKeyword: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: searchKeyword },
    });
  };

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
          {/* <Image
            src="/images/ic_search.svg"
            alt="Search Icon"
            width={24}
            height={24}
          /> */}
          <SearchIcon alt="Search Icon" />
          <input
            className="searchInput"
            // onSearch={handleSearch}
            value={searchKeyword}
            onChange={handleSearchInput}
            placeholder="검색할 상품을 입력해 주세요"
          />
        </div>

        <Dropdown
          onSortSelection={handleSortSelection}
          sortOptions={sortOptions}
        />
      </div>

      <div>
        {itemList.length &&
          itemList.map((item) => (
            <ItemCard item={item} key={`all-item-${item.id}`} />
          ))}
        {/* {itemList.length > 0 ? (
          itemList.map((item) => (
            <ItemCard item={item} key={`all-item-${item.id}`} />
          ))
        ) : (
          <p>No items available</p>
        )} */}
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
};

export default AllProduct;
