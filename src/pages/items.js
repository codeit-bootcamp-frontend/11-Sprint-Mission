import ProductList from '../components/ProductList';
import BestProduct from '../components/BestProduct';
import Pagination from '../components/Pagination';
import '../styles/items.css';
import { useEffect, useState } from 'react';
import { getProducts } from '../hooks/api';
import { Link } from 'react-router-dom';

const LIMIT = 6; // 한 페이지에 보여줄 아이템 수

function Items() {
  const [order, setOrder] = useState('createdAt'); // 정렬 기준
  const [items, setItems] = useState([]); // 전체 상품 목록
  const [bestItem, setBestItem] = useState([]); // 베스트 상품 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 열림 상태

  //  API 호출하여 전체 상품 및 베스트 상품을 로드하는 함수
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        // 모든 상품 데이터를 API로부터 불러오기
        const { list } = await getProducts();
        setItems(list);

        // 베스트 상품을 favoriteCount 기준으로 상위 4개 선택
        const sortedBestItems = list
          .sort((a, b) => b.favoriteCount - a.favoriteCount)
          .slice(0, 4);
        setBestItem(sortedBestItems); // 베스트 상품 상태 업데이트

        console.log('전체 아이템 수:', list.length); // 총 상품 개수 콘솔 출력 (확인용)
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };

    loadAllProducts(); // 처음 로드 시 전체 상품 로드
  }, []);

  // 상품 정렬 (createdAt, favoriteCount)
  const sortedItems = [...items].sort((a, b) => {
    if (order === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt); // 최신순 정렬
    }
    return b[order] - a[order]; // 베스트순 정렬
  });

  // 페이지네이션을 위한 현재 페이지의 시작과 끝 인덱스
  const startIndex = (currentPage - 1) * LIMIT;
  const currentItems = sortedItems.slice(startIndex, startIndex + LIMIT); // 현재 페이지에 해당하는 상품만 추출

  const totalPages = Math.ceil(items.length / LIMIT); // 전체 페이지 수 계산
  console.log('Total Pages:', totalPages);

  // 드롭다운 열림/닫힘 토글
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호 변경
  };

  return (
    <>
      <div className="pandaMarket">
        <div className="page">
          <div className="bestProduct">
            <p className="subTitle">베스트 상품</p>
            <BestProduct items={bestItem} />
          </div>

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
                    {order === 'createdAt' ? '최신순' : '베스트순'} ▼
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      <p
                        onClick={() => {
                          setOrder('createdAt');
                          setDropdownOpen(false);
                        }}
                      >
                        최신순
                      </p>
                      <p
                        onClick={() => {
                          setOrder('favoriteCount');
                          setDropdownOpen(false);
                        }}
                      >
                        베스트순
                      </p>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* 현재 페이지에 해당하는 상품 목록 */}
            <ProductList items={currentItems} />

            {/* 페이지네이션 컴포넌트 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
