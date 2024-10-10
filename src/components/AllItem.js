import { useEffect, useState } from "react";
import ItemCard from "./AllItemCard";
import { getProducts } from "../api";
import Pagination from "./Pagination";
import "./common.css";
import "./AllItem.css";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
};

function AllItems() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [items, setItems] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState();

  const fetchProducts = async ({ orderBy, page, pageSize }) => {
    const products = await getProducts({ orderBy, page, pageSize });
    setItems(products.list);
    setTotalPageNum(Math.ceil(products.totalCount / pageSize));
  };

  useEffect(() => {
    const handleFixSize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleFixSize);
    fetchProducts({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener("resize", handleFixSize);
    };
  }, [orderBy, page, pageSize]);

  const handleNextPage = (newPage) => {
    setPage(newPage);
  };

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleOrderByChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    setPage(1);
    setIsDropdown(false);
  };

  return (
    <div className="all-item-container">
      <div className="all-item-content">
        <div className="all-item-header">
          <div className="all-item-title">전체 상품</div>
          <div className="all-item-search">
            <div className="all-item-search-container">
              <input
                className="all-item-search-input"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
            <button className="all-item-register">상품 등록하기</button>
          </div>
          <div className="all-item-sort">
            <button className="all-item-sort-button" onClick={toggleDropdown}>
              {orderBy === "recent" ? "최신순" : "좋아요순"} ▼
            </button>
            {isDropdown && (
              <div className="all-item-sort-options">
                <div onClick={() => handleOrderByChange("recent")}>최신순</div>
                <div onClick={() => handleOrderByChange("favorite")}>
                  좋아요순
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="all-item-card-container">
          {items?.map((item) => (
            <ItemCard item={item} key={`all-item-${item.id}`} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPageNum={totalPageNum}
          onPageChange={handleNextPage}
        />
      </div>
    </div>
  );
}

export default AllItems;
