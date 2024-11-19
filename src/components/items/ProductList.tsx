import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "utils/api";
import { updateProductsPerPage } from "utils/checkDevice";
import Product from "./Product";
import DropDown from "./DropDown";
import Search from "./Search";
import PrimaryButton from "components/common/PrimaryButton";
import Paginations from "./Paginations";

export interface ProductInterface {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}

function ProductList() {
  const navigate = useNavigate();
  const initialperPage = updateProductsPerPage(window.innerWidth);
  const [products, setProducts] = useState<{
    list: ProductInterface[];
    totalProductsCount: number;
  }>({ list: [], totalProductsCount: 0 }); // 서버에서 받아올 Proudcts를 할당할 state
  const [productsPerPage, setProductsPerPage] = useState(initialperPage); // 반응형에 따라 보여줄 Product 수를 할당할 state
  const [order, setOrder] = useState("recent"); // 데이터 정렬을 위한 queryParam [orderBy]
  const [currentPage, setCurrentPage] = useState(1); // 데이터 호출을 위한 queryParam [page]
  const [keyword, setKeyword] = useState("");

  /**
   * 서버에서 데이터를 가져오는 함수
   * 재사용을 위해 useCallback Hook으로 함수 캐싱 -> React: exhustive-deps Eslint 방지
   */
  const loadProducts = useCallback(
    (page = currentPage.toString(), pageSize = productsPerPage.toString()) => {
      fetchProducts({ page, pageSize, orderBy: order, keyword: keyword }).then(
        ({ list, totalCount }) => {
          const totalPageCount = Math.ceil(totalCount / productsPerPage);
          setProducts({ list: list, totalProductsCount: totalPageCount });
          if (!keyword && currentPage > totalPageCount)
            setCurrentPage(totalPageCount);
        }
      );
    },
    [currentPage, productsPerPage, order, keyword]
  );

  /**
   * pagination 핸들러
   * @param {*} page active 페이지
   */
  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    // initial 데이터 로드
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    /**
     * 디바이스(화면사이즈)에 따라 서버에 데이터 요청 -> 반응형 대응
     */
    const handleResize = () => {
      const currentPerPage = updateProductsPerPage(window.innerWidth);

      if (productsPerPage !== currentPerPage) {
        // breakPoint가 바뀔 때만 서버에 데이터 요청하기 위해 분기처리 : 'pc' -> 'tablet' or 'tablet' -> 'pc' ...
        setProductsPerPage(currentPerPage);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // 언마운트: 리사이즈 이벤트 삭제
  }, [productsPerPage, loadProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [order, keyword]);

  return (
    <section id='section_all'>
      <div className='top'>
        <h2 className='products-title'>전체 상품</h2>
        <div className='filter-area'>
          <Search setKeyword={setKeyword} />
          <PrimaryButton
            name='btn-register'
            onClick={() => navigate("/addItem")}
          >
            상품 등록하기
          </PrimaryButton>
          <DropDown setOrder={setOrder} />
        </div>
      </div>
      <ul className='products-wrap all'>
        {products.list.map((product) => (
          <li key={product.id} className='product-item'>
            <Product product={product} />
          </li>
        ))}
      </ul>
      <Paginations
        totalPage={products.totalProductsCount}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}

export default ProductList;
