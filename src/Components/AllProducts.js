import { useEffect, useRef, useState } from 'react';
import { getProducts } from '../api/api';
import Product from './Product';
import Pagination from './Pagination';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import IconSearch from '../assets/icon-search.svg';

// 기본 페이지 사이즈
const PAGE_SIZE = 10;

export default function AllProducts() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [totalCount, setTotalCount] = useState(0);
  const inSearchRef = useRef();

  // 데이터 가져오기
  const handleLoad = async (options = {}) => {
    let result;
    try {
      result = await getProducts(options);
    } catch (error) {
      console.log('error', error.message);
    }
    setProducts(result.list);
    setTotalCount(result.totalCount);
  };

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
  const handleKeywordReset = (e) => {
    setKeyword('');
  };

  // 페이지네이션 처리
  const handlePaginationClick = (pageNum) => {
    // console.log('fn:handlePaginationClick', pageNum);
    setPage(pageNum);
  };

  useEffect(() => {
    handleLoad({ keyword, orderBy, page });
  }, [keyword, orderBy, page]);

  return (
    <div className="products">
      <div className="flex items-center gap-3 flex-wrap my-4 justify-end">
        <h2 className="products-title mr-auto">전체 상품</h2>

        <form className="flex gap-1 relative" onSubmit={handleKeywordSubmit}>
          <input
            className="in-search"
            type="text"
            ref={inSearchRef}
            placeholder="검색할 상품을 입력해 주세요"
          />
          <img className="absolute top-2 left-3" src={IconSearch} alt="" />
          <button
            className="btn-reset"
            type="reset"
            title="검색 초기화"
            onClick={handleKeywordReset}>
            <ArrowPathIcon className="size-4 mx-auto" />
          </button>
        </form>

        <a href="/additem" className="btn">
          상품 등록하기
        </a>

        <select className="in-order" onChange={handleOrder} value={orderBy}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요 순</option>
        </select>
      </div>

      <div className="all">
        {products.map(({ id, images, name, price, favoriteCount }) => (
          <Product
            key={id}
            image={images[0]}
            name={name}
            price={price}
            favoriteCount={favoriteCount}
          />
        ))}
      </div>

      <Pagination
        className="my-10 mx-auto justify-center"
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={totalCount}
        onClick={handlePaginationClick}
      />
    </div>
  );
}
