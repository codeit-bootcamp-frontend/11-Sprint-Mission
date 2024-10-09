import React, { useState } from "react";
import AllItem from "./AllItem";

import selectButton from "../../../shared/assets/selectButton.svg";
import glass from "../../../shared/assets/glass.svg";

import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import SortDropDownList from "./SortDropDownList";
import AddItemButton from "./AddItemButton";
import { fetchItems } from "../service/fetchItems";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import useResponsiveDisplayCount from "../hooks/useResponsiveDisplayCount";
const AllItems = () => {
  const { bestDisplayCount, allDisplayCount } = useResponsiveDisplayCount(); // 훅 사용
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [currentPage, setCurrentPage] = useState(1);

  const [orderBy, setOrderBy] = useState("recent");
  console.log(allDisplayCount);
  const handlorderByChange = (e) => {
    e.preventDefault(); // 기본 동작 방지
    setOrderBy(e.target.value); // 선택된 옵션에 따라 sortBy 값을 업데이트
  };
  const handleOptionClick = (value) => {
    setOrderBy(value);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["posts", currentPage, allDisplayCount, orderBy], // 캐시 키는 페이지마다 다르게 설정
    queryFn: () => fetchItems(currentPage, allDisplayCount, orderBy), // 데이터를 가져오는 함수
    keepPreviousData: true, //
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // event.selected는 0부터 시작하므로 +1 해줍니다.
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <p>Error loading data</p>;
  const totalPages = data ? Math.ceil(data.totalCount / allDisplayCount) : 0; // totalCount에서 페이지 수 계산

  return (
    <div className="w-full p-2 sm:flex  flex-col gap-y-3 lg:w-2/3 lg:justify-center">
      {isFetching ? <div>Fetching new page...</div> : null}
      <div className="hidden sm:flex mt-4 items-center justify-between">
        <h2 className="text-base font-bold">전체 상품</h2>
        <div className="flex items-center gap-x-3 ">
          <SearchBar />
          <AddItemButton />
          <SortSelect
            orderBy={orderBy}
            handlorderByChange={handlorderByChange}
          />
        </div>
      </div>
      {/* sm미만 */}
      <div className="flex mt-4 gap-y-2 items-center flex-col sm:hidden">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-base font-bold">전체 상품</h2>
          <AddItemButton />
        </div>

        <div className="flex  w-full justify-between items-center gap-x-3  mb-1">
          <div className="relative w-full flex gap-x-3">
            <input
              className="p-2 pl-8 rounded-lg  h-9 w-5/6 bg-[#F3F4F6]"
              placeholder="검색할 상품을 입력해주세요"
            />{" "}
            <img className="absolute left-1 top-3" src={glass} />
          </div>

          <div className="relative">
            <button
              className="w-12 flex justify-center border rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img className="w-2/3" src={selectButton}></img>
            </button>
            {isOpen && (
              <SortDropDownList
                isOpen={isOpen}
                handleOptionClick={handleOptionClick}
              />
            )}
          </div>
        </div>
      </div>
      {/* 상품 목록을 표시하는 부분 */}
      <div className="mt-1 grid grid-cols-2 sm:mt-0 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.list.map((product) => (
          <AllItem product={product} key={product.id} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={totalPages} // 총 페이지 수를 설정
        marginPagesDisplayed={0} // 양쪽에 표시할 페이지 수
        pageRangeDisplayed={5} // 현재 페이지 기준으로 표시할 페이지 수
        onPageChange={handlePageClick} // 페이지가 변경될 때 호출되는 함수
        forcePage={currentPage - 1} // 현재 페이지 상태를 강제로 유지
        containerClassName={"flex justify-center items-center space-x-2 mt-2"} // 페이지네이션 컨테이너를 가로로 정렬
        pageClassName={"page-item"} // 페이지 항목 클래스
        pageLinkClassName={"page-link px-3 py-1 border rounded"} // 페이지 링크 클래스 (버튼 스타일 추가)
        previousClassName={"page-item"}
        previousLinkClassName={"page-link px-3 py-1 border rounded"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link px-3 py-1 border rounded"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link px-3 py-1 border rounded"}
        activeClassName={"active bg-blue-500 text-white"} // 활성화된 페이지 클래스
      />{" "}
      {/* 페이지를 바꿀 때 */}
    </div>
  );
};

export default AllItems;
