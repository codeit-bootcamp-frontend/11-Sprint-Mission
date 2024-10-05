import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api.js";
import { Link } from "react-router-dom";
import "../css/AllItem.css";
import { useMediaQuery } from "react-responsive";

const AllItem = () => {
  const [products, setProducts] = useState([]); // 제품 리스트 저장 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [orderBy, setOrderBy] = useState("recent"); //정렬 상태
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const pageSize = isDesktop ? 10 : isTablet ? 6 : isMobile ? 4 : 10;

  const totalPage = Math.ceil(totalCount / pageSize); // 전체 페이지 개수 구하기

  useEffect(() => {
    const fetchProducts = async () => {
      let result;
      try {
        setLoading(true);
        result = await getProducts({
          page: page,
          pageSize: pageSize,
          orderBy: orderBy,
          keyword: "",
        });
        // console.log(result);
        setProducts(result.list);
        setTotalCount(result.totalCount);
      } catch (err) {
        setError(err.message);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderBy, page, pageSize]);

  const handleOrderChange = (e) => {
    //정렬 방식 변경
    setOrderBy(e.target.value);
  };

  const handleNextPage = () => {
    //페이지네이션 다음 버튼 이벤트
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    // 페이지네이션 이전 버튼 이벤트
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const getPageNumber = () => {
    //페이지네이션 넘버링을 위한 계산
    const pageNumbers = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(start + 4, totalPage); //마지막 페이지가 5개묶음 도중 끝날경우 대비

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <p>Error: {error}</p>; // 에러 발생 시 표시할 내용
  }

  return (
    <div className="all-product-box">
      <div className="product-head-box">
        <h2 className="page-head">전체 상품</h2>
        <div className="search-box">
          <input
            type="text"
            className="product-search"
            placeholder="검색할 상품을 입력해주세요"
          ></input>
          <Link to="/additem">
            <button className="add-button">상품 등록하기</button>
          </Link>
          <select
            className="option-select"
            value={orderBy}
            onChange={handleOrderChange}
          >
            <option className="option" value="recent">
              최신순
            </option>
            <option className="option" value="favorite">
              좋아요순
            </option>
          </select>
        </div>
      </div>
      <ul className="all-product-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="all-product-list">
              {product.images.length > 0 && (
                <div className="all-product-image-box">
                  <img
                    className="all-product-image"
                    src={product.images[0]}
                    alt={product.name}
                  />
                </div>
              )}
              <h3 className="all-product-name">{product.name}</h3>
              <p className="all-product-price">{product.price}원</p>
              <div className="all-product-count-box">
                <img
                  className="all-product-count-image"
                  src="/assets/Icon.png"
                  alt="좋아요 하트 기호"
                ></img>
                <p className="all-product-count">{product.favoriteCount}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="pagination-button"
        >
          &lt;
        </button>
        {getPageNumber().map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={
              number === page ? "pagination-active" : "pagination-inactive"
            }
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={page === totalPage}
          className="pagination-button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AllItem;
