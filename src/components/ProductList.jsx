import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchProducts from "utils/api";
import { getBreakpoint, updateProductsPerPage } from "utils/checkDevice";
import Product from "./Product";
import DropDown from "./DropDown";
import Search from "./Search";
import PrimaryButton from "./PrimaryButton";
import Paginations from "./Paginations";

function ProductList() {
  const navigate = useNavigate();
  const initialDevice = getBreakpoint(window.innerWidth);
  const initialperPage = updateProductsPerPage(initialDevice);
  const [products, setProducts] = useState([]); // 서버에서 받아올 Proudcts를 할당할 state
  const [productsPerPage, setProductsPerPage] = useState(initialperPage); // 반응형에 따라 보여줄 Product 수를 할당할 state
  const [device, setDevice] = useState(initialDevice); // 반응형 ('pc' | 'tablet' | 'mobile')
  const [order, setOrder] = useState("recent"); // 데이터 정렬을 위한 queryParam [orderBy]
  const [totalPage, setTotalPage] = useState(0); // Pagination을 위한 전체 페이지 수를 할당할 state
  const [currentPage, setCurrentPage] = useState(1); // 데이터 호출을 위한 queryParam [page]

  /**
   * pagination을 위한 totalPage 계산
   * 재사용을 위해 useCallback Hook으로 함수 캐싱 -> React: exhustive-deps Eslint 방지
   * @param {*} totalCount 전체 Product 수
   * @param {*} perPage 화면에 보여질 Product 수 (반응형에 사용)
   */
  const countTotalPage = useCallback(
    (totalCount, perPage) => {
      const totalPageCount = Math.ceil(totalCount / perPage);
      setTotalPage(totalPageCount);
      if (currentPage > totalPageCount) setCurrentPage(totalPageCount);
    },
    [currentPage]
  );

  /**
   * 서버에서 데이터를 가져오는 함수
   * 재사용을 위해 useCallback Hook으로 함수 캐싱 -> React: exhustive-deps Eslint 방지
   */
  const loadProducts = useCallback(
    (page = currentPage, pageSize = productsPerPage) => {
      fetchProducts({ page, pageSize, orderBy: order }).then(
        ({ list, totalCount }) => {
          setProducts(list);
          countTotalPage(totalCount, pageSize);
        }
      );
    },
    [currentPage, productsPerPage, order, countTotalPage]
  );

  /**
   * pagination 핸들러
   * @param {*} page active 페이지
   */
  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    /**
     * 디바이스(화면사이즈)에 따라 서버에 데이터 요청 -> 반응형 대응
     */
    const handleResize = () => {
      const currentDevice = getBreakpoint(window.innerWidth);

      if (device !== currentDevice) {
        // breakPoint가 바뀔 때만 서버에 데이터 요청하기 위해 분기처리 : 'pc' -> 'tablet' or 'tablet' -> 'pc' ...
        const perPage = updateProductsPerPage(currentDevice);
        setDevice(currentDevice);
        setProductsPerPage(perPage);
        // loadProducts(productsPerPage);
      }
    };

    // initial 데이터 로드
    loadProducts();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // 언마운트: 리사이즈 이벤트 삭제
  }, [device, order, currentPage, countTotalPage, loadProducts]); // lint 경고

  return (
    <section id="section_all">
      <div className="top">
        <h2 className="products-title">전체 상품</h2>
        <div className="filter-area">
          <Search setProducts={setProducts} perPage={productsPerPage} />
          <PrimaryButton
            name="btn-register"
            onClick={() => navigate("/addItem")}
          >
            상품 등록하기
          </PrimaryButton>
          <DropDown setOrder={setOrder} />
        </div>
      </div>
      <ul className="products-wrap all">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <Product product={product} />
          </li>
        ))}
      </ul>
      <Paginations
        totalPage={totalPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}

export default ProductList;
