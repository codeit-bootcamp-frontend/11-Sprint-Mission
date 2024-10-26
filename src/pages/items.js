import ProductList from '../components/ProductList';
import BestProduct from '../components/BestProduct';
import Pagination from '../components/Pagination';
import '../styles/items.css';
import { useEffect, useState } from 'react';
import { getProducts } from '../hooks/api';
import { Link } from 'react-router-dom';

const LIMIT = 6; // 한 페이지에 보여줄 아이템 수

function Items() {
  const [order, setOrder] = useState('recent'); // 정렬 기준
  const [items, setItems] = useState([]); // 현재 페이지 상품 목록
  const [bestItems, setBestItems] = useState([]); // 베스트 상품 목록
  const [allItems, setAllItems] = useState([]); // 전체 상품 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalItems, setTotalItems] = useState(0); // 전체 아이템 수
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 전체 상품을 불러오는 함수
  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const firstPageData = await getProducts(1, LIMIT, 'recent');
      const totalItems = firstPageData.totalCount;
      const totalPages = Math.ceil(totalItems / LIMIT);
      let allFetchedItems = firstPageData.list;

      // 나머지 페이지 데이터도 불러오기
      if (totalPages > 1) {
        const pageRequests = [];
        for (let i = 2; i <= totalPages; i++) {
          pageRequests.push(getProducts(i, LIMIT, 'recent'));
        }
        const remainingPagesData = await Promise.all(pageRequests);
        remainingPagesData.forEach((pageData) => {
          allFetchedItems = allFetchedItems.concat(pageData.list);
        });
      }

      setAllItems(allFetchedItems); // 전체 상품 목록 저장
      setTotalItems(totalItems); // 전체 상품 수 설정

      // 베스트 상품을 전체 상품 기준으로 상위 4개 선택
      const sortedBestItems = [...allFetchedItems]
        .sort((a, b) => b.favoriteCount - a.favoriteCount)
        .slice(0, 4);

      setBestItems(sortedBestItems); // 베스트 상품 설정
    } catch (error) {
      console.error('베스트 상품 로드 중 오류 발생:', error);
      setError('베스트 상품 로드 중 오류 발생.');
    } finally {
      setLoading(false);
    }
  };

  // 현재 페이지의 상품을 불러오는 함수
  const loadProductsForPage = () => {
    let products = [];

    // 베스트순일 경우 전체 상품을 favoriteCount로 정렬한 후, 페이지별로 나누어 설정
    if (order === 'favoriteCount') {
      const sortedAllItems = [...allItems].sort(
        (a, b) => b.favoriteCount - a.favoriteCount
      );
      const startIndex = (currentPage - 1) * LIMIT;
      products = sortedAllItems.slice(startIndex, startIndex + LIMIT);
    } else {
      // 최신순일 경우 현재 페이지의 상품만 가져옴
      const startIndex = (currentPage - 1) * LIMIT;
      products = allItems.slice(startIndex, startIndex + LIMIT);
    }

    setItems(products); // 현재 페이지에 해당하는 상품 설정
  };

  // 처음 렌더링 시 전체 상품과 베스트 상품 로드
  useEffect(() => {
    loadAllProducts(); // 전체 상품을 한 번만 로드
  }, []);

  // 페이지나 정렬 기준 변경 시 상품 로드
  useEffect(() => {
    loadProductsForPage(); // 페이지 전환 또는 정렬 기준 변경 시 상품 로드
  }, [currentPage, order, allItems]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pandaMarket">
      <div className="page">
        {/* 베스트 상품 섹션 */}
        <div className="bestProduct">
          <p className="subTitle">베스트 상품</p>
          <BestProduct items={bestItems} />
        </div>

        {/* 전체 상품 섹션 */}
        <div className="AllProductList">
          <div className="subHeader">
            <p className="subTitle">전체 상품</p>
            <div className="sub">
              <input placeholder="검색어를 입력하세요" />
              <Link to="/additem">
                <button className="productUp">상품 등록하기</button>
              </Link>
              <div className="dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                  {order === 'recent' ? '최신순' : '베스트순'} ▼
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => {
                        setOrder('recent');
                        setDropdownOpen(false);
                      }}
                    >
                      최신순
                    </li>
                    <li
                      onClick={() => {
                        setOrder('favoriteCount');
                        setDropdownOpen(false);
                      }}
                    >
                      베스트순
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* 현재 페이지에 해당하는 상품 목록 */}
          <ProductList items={items} />

          {/* 페이지네이션 컴포넌트 */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / LIMIT)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Items;
