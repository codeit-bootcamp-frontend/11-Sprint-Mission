// css
import '@/css/Items.css';

// 사용된 컴포넌트
import { getItems } from '@/service/api';
import ItemList from '@/library/items/ItemList';
import Dropdown from '@/library/items/Dropdown';

// 사용된 이미지
import polygonon from '@/assets/Polygon.png';
import polygonoff from '@/assets/PolygonB.png';
import searchIcon from '@/assets/searchIcon.png';
import prev from '@/assets/prev.png';
import next from '@/assets/next.png';
import Pagination from 'react-js-pagination';

// react hook 및 Link
import { useEffect, useState, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { throttle } from 'lodash';

// 페이지 크기를 주어진 타입에 맞게 반환하는 함수
const getPageSize = (type: 'normal' | 'favorite' = 'normal'): number => {
  const width = window.innerWidth;
  if (width < 768) {
    return type === 'favorite' ? 1 : 4;
  } else if (width < 1280) {
    return type === 'favorite' ? 2 : 6;
  } else {
    return type === 'favorite' ? 4 : 10;
  }
};

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}

function Items({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [isDropdownView, setDropdownView] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(getPageSize());

  // 비동기 함수로 전체 상품과 베스트 상품을 로드
  const contentLoad = async (
    orderBy: string,
    keyword: string,
    page: number,
    pageSize: number
  ) => {
    try {
      const [productResponse, bestProductResponse] = await Promise.all([
        getItems(orderBy, keyword, page, pageSize),
        getItems('favorite'),
      ]);

      const { list, totalCount } = productResponse;
      const { list: bestItems } = bestProductResponse;

      setTotal(totalCount);
      setProducts(list);
      setBestProducts(bestItems);
    } catch (error) {
      console.error('상품 목록 로드 중 오류 발생', error);
      throw new Error('상품 목록을 로드하는데 실패했습니다.');
    }
  };

  const mainBestItems = bestProducts.slice(0, getPageSize('favorite'));
  const mainItems = products.slice(0, getPageSize());

  // 드롭다운 토글 함수
  const handleDropdownView = () => {
    setDropdownView(!isDropdownView);
  };

  // 드롭다운 메뉴에서 선택한 값에 따라 정렬 조건 변경
  const handleSelectMenu = (onSelect: string) => {
    setOrderBy(onSelect === '최신순' ? 'recent' : 'favorite');
    setDropdownView(false);
  };

  // 검색 기능 구현, input -> useRef 사용
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 검색 제출 핸들러
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value ?? '';
    setKeyword(value);

    if (value === '') {
      setPage(1);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setPage(page);
    contentLoad(orderBy, keyword, page, pageSize);
  };

  // 페이지 로드 시 실행될 함수
  useEffect(() => {
    contentLoad(orderBy, keyword, page, pageSize);
  }, [orderBy, keyword, page, pageSize]);

  // 화면 크기 변경 시 페이지 크기 업데이트
  useEffect(() => {
    const handleResize = throttle(() => {
      setPageSize(getPageSize());
      setPage(1);
    }, 100); // 100ms 간격으로 실행

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel(); // 컴포넌트 언마운트 시 쓰로틀 취소
    };
  }, []);

  // 렌더링될 JSX 반환
  return (
    <>
      <Helmet>
        <title>{children}</title>
      </Helmet>
      <div className="content">
        <div className="bestProducts">
          <h1>베스트 상품</h1>
          <ul className="bestProductList">
            {mainBestItems.length > 0 ? (
              mainBestItems.map((item) => (
                <li key={item.id}>
                  <ItemList className="itemList" item={item} />
                </li>
              ))
            ) : (
              <li>베스트 상품이 없습니다.</li>
            )}
          </ul>
        </div>
        <div className="allProducts">
          <div className="topInfo">
            <h1>전체 상품</h1>
            <div className="utils">
              <div className="search">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="검색할 상품을 입력해주세요."
                    ref={inputRef}
                  />
                  <img className="searchIcon" src={searchIcon} alt="검색하기" />
                </form>
              </div>
              <Link to="/AddItem">
                <button id="postButton">상품 등록하기</button>
              </Link>
              <div className="selectAlignMenu">
                <label onClick={handleDropdownView}>
                  <button>
                    <span> {orderBy === 'recent' ? '최신순' : '좋아요순'}</span>
                    {isDropdownView ? (
                      <img src={polygonoff} alt="메뉴 닫힘" />
                    ) : (
                      <img src={polygonon} alt="메뉴 열림" />
                    )}
                  </button>
                </label>
                {isDropdownView && <Dropdown onSelect={handleSelectMenu} />}
              </div>
            </div>
          </div>
          <ul className="productList">
            {mainItems.length > 0 ? (
              mainItems.map((item) => (
                <li key={item.id}>
                  <ItemList className="itemList" item={item} />
                </li>
              ))
            ) : (
              <li>등록된 상품이 없습니다.</li>
            )}
          </ul>
        </div>
        <div className="paging">
          <Pagination
            activePage={page}
            itemsCountPerPage={pageSize}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            prevPageText={<img src={prev} alt="prev" />}
            nextPageText={<img src={next} alt="next" />}
            onChange={handlePageChange}
            hideFirstLastPages={true}
            linkClassPrev={'prevPaging'}
            linkClassNext={'nextPaging'}
            activeLinkClass={'activePaging'}
          />
        </div>
      </div>
    </>
  );
}

export default Items;
