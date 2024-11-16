import { useEffect, useState } from "react";
import ItemCard from "./AllItemCard";
import { getProducts } from "../api";
import Pagination from "./Pagination";
import "./common.css";
import "./AllItem.css";
import searchIcon from "../assets/ic_search.svg";

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

  useEffect(() => {
    const handleFixSize = () => {
      setPageSize(getPageSize());
    };

    const fetchProducts = async ({ orderBy, page, pageSize }) => {
      const products = await getProducts({ orderBy, page, pageSize });
      setItems(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
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
          <div className="all-item-header-front">
            <div className="all-item-title">전체 상품</div>
            <div className="all-item-search-container">
              <img
                className="all-item-search-icon"
                src={searchIcon}
                alt="돋보기 아이콘"
              />
              <input
                className="all-item-search-input"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
          </div>
          <div className="all-item-header-end">
            <div className="all-item-sort">
              <a href="./additem">
                <button className="all-item-register-button">
                  상품 등록하기
                </button>
              </a>
              <button className="all-item-sort-button" onClick={toggleDropdown}>
                {orderBy === "recent" ? "최신순" : "좋아요순"} ▼
              </button>
              {isDropdown && (
                <div className="all-item-sort-options">
                  <div onClick={() => handleOrderByChange("recent")}>
                    최신순
                  </div>
                  <div onClick={() => handleOrderByChange("favorite")}>
                    좋아요순
                  </div>
                </div>
              )}
            </div>
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
