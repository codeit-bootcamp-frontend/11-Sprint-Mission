// css
import './css/Items.css';

// 사용된 컴포넌트
import { getItems } from './service/api.js';
import ItemList from './library/items/ItemList.js';
import Dropdown from './library/items/Dropdown.js';

// 사용된 이미지
import polygonon from './assets/Polygon.png';
import polygonoff from './assets/PolygonB.png';
import searchIcon from './assets/searchIcon.png';
import prev from './assets/prev.png';
import next from './assets/next.png';
import Pagination from 'react-js-pagination';

// react hook 및 Link
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * 주어진 타입에 따라 페이지 크기를 결정하는 함수.
 * @param {string} type - 'normal' 또는 'favorite'에 따라 다른 페이지 크기를 반환.
 * @returns {number} - 결정된 페이지 크기.
 */

const getPageSize = (type = 'normal') => {
  const width = window.innerWidth;
  if (width < 768) {
    return type === 'favorite' ? 1 : 4;
  } else if (width < 1280) {
    return type === 'favorite' ? 2 : 6;
  } else {
    return type === 'favorite' ? 4 : 10;
  }
};

function Items() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [isDropdownView, setDropdownView] = useState(false);
  const [orderBy, setOrderBy] = useState('recent');
  const [selectMenu, setSelectMenu] = useState('최신순');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(getPageSize());

  /**
   * 상품 목록을 로드하는 비동기 함수.
   * @param {string} orderBy - 정렬 기준 ('recent' 또는 'favorite').
   * @param {string} keyword - 검색 키워드.
   * @param {number} page - 현재 페이지 번호.
   * @param {number} pageSize - 페이지당 아이템 수.
   */

  // promise.all로 상단에 배치될 베스트 상품과 전체 상품을 받고 있음.
  const contentLoad = async (orderBy, keyword, page, pageSize) => {
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
      console.log('상품 목록 로드 중 오류 발생', error);
      throw new Error('상품 목록을 로드하는데 실패했습니다.');
    }
  };

  const mainBestItems = bestProducts.slice(0, getPageSize('favorite'));
  const mainItems = products.slice(0, getPageSize());

  // setDropdownView가 false 시 드롭다운 닫힘, true 시 열림
  const handleDropdownView = () => {
    setDropdownView(!isDropdownView);
  };

  /**
   * 드롭다운 메뉴에서 선택한 항목을 처리하는 함수.
   * @param {string} onSelect - 선택한 항목.
   */
  const handleSelectMenu = (onSelect) => {
    setSelectMenu(onSelect);
    setOrderBy(onSelect === '최신순' ? 'recent' : 'favorite');
    setDropdownView(false);
  };

  // 검색 기능을 위한 input -> useRef 사용, 초기 값 null
  const inputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    setKeyword(value);

    if (value === '') {
      setPage(1);
    }
  };

  /**
   * 페이지 변경을 처리하는 함수.
   * @param {number} page - 변경할 페이지 번호.
   */
  const handlePageChange = (page) => {
    setPage(page);
    contentLoad(orderBy, keyword, page, pageSize);
  };

  // 페이지 로드 시 실행 될 함수
  useEffect(() => {
    contentLoad(orderBy, keyword, page, pageSize);
  }, [orderBy, keyword, page, pageSize]);

  // 브라우저 크기 변경 시 실행 될 함수, return으로 이벤트 리스너 정리
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      setPage(1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 브라우저에 return 될 최종 값, Pagination은 라이브러리 사용.
  return (
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
                  <span>{selectMenu}</span>
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
        ></Pagination>
      </div>
    </div>
  );
}

export default Items;
