import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import useAsync from '../hooks/useAsync';
//
import Product from './Product';
import Pagination from './Pagination';
import Loading from './Loading';
//
import IconSearch from '../assets/icon-search.svg';

// 기본 페이지 사이즈
const PAGE_SIZE = 10;

/**
 * 중고마켓 메인 페이지 - 전체상품 목록 컴포넌트
 * @return {JSX}
 */
function AllProducts() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, loadingError, getProductsAsync] = useAsync(getProducts);
  const inSearchRef = useRef();

  // 정렬 변경
  const handleOrder = (e) => {
    setOrderBy(e.target.value);
  };

  // 검색어 필터링
  const handleKeywordSubmit = (e) => {
    e.preventDefault();

    const inputSearch = inSearchRef.current;
    setKeyword(inputSearch.value);
  };
  const handleKeywordReset = () => {
    setKeyword('');
  };

  // 페이지네이션 처리
  const handlePaginationClick = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    // 데이터 가져오기
    const handleLoad = async (options = {}) => {
      const result = await getProductsAsync(options);
      if (!result) return;

      setProducts(result.list);
      setTotalCount(result.totalCount);
    };

    handleLoad({ keyword, orderBy, page });
  }, [keyword, orderBy, page]);

  return (
    <div className="products">
      <div className="my-4 flex flex-wrap items-center justify-end gap-3">
        <h2 className="products-title mr-auto">전체 상품</h2>

        <form
          className="relative flex gap-1"
          onSubmit={handleKeywordSubmit}
          onReset={handleKeywordReset}
        >
          <input
            className="in-search"
            type="text"
            ref={inSearchRef}
            placeholder="검색할 상품을 입력해 주세요"
          />
          <img className="absolute left-3 top-2" src={IconSearch} alt="" />

          <button className="btn-reset" type="reset" title="검색 초기화">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-auto size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </form>

        <Link to="/additem" className="btn">
          상품 등록하기
        </Link>

        <select className="in-order" onChange={handleOrder} value={orderBy}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요 순</option>
        </select>
      </div>

      <div className="all">
        <Loading visible={isLoading} />

        {products.map(({ id, images, name, price, favoriteCount }) => (
          <Product
            key={id}
            id={id}
            image={images[0]}
            name={name}
            price={price}
            favoriteCount={favoriteCount}
          />
        ))}

        {loadingError?.message && <p className="text-center font-bold">{loadingError.message}</p>}
      </div>

      <Pagination
        className="mx-auto my-10 justify-center"
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={totalCount}
        onClick={handlePaginationClick}
      />
    </div>
  );
}

export default AllProducts;
