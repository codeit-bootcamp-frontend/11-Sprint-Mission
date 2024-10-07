import './css/Items.css';
import getItems from './service/api.js';
import ItemList from './library/items/ItemList.js';
import Dropdown from './library/items/Dropdown.js';

import polygonon from './assets/Polygon.png';
import polygonoff from './assets/PolygonB.png';
import searchIcon from './assets/searchIcon.png';
import prev from './assets/prev.png';
import next from './assets/next.png';
import Pagination from 'react-js-pagination';
import { useEffect } from 'react';
import { useState } from 'react';

const getBestPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

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

  const contentLoad = async (orderBy, keyword, page, pageSize) => {
    const { list, totalCount } = await getItems(
      orderBy,
      keyword,
      page,
      pageSize
    );

    if (totalCount === 0 && page > 1) {
      setPage(1);
      return;
    }

    setTotal(totalCount);
    setProducts(list);

    const { list: bestItems } = await getItems('favorite');
    setBestProducts(bestItems);
  };

  const mainBestItems = bestProducts.slice(0, getBestPageSize());
  const mainItems = products.slice(0, getPageSize());

  const handleDropdownView = () => {
    setDropdownView(!isDropdownView);
  };

  const handleSelectMenu = (onSelect) => {
    setSelectMenu(onSelect);
    setOrderBy(onSelect === '최신순' ? 'recent' : 'favorite');
    setDropdownView(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setKeyword(value);

    if (value === '') {
      setPage(1);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
    contentLoad(orderBy, keyword, page, pageSize);
  };

  useEffect(() => {
    contentLoad(orderBy, keyword, page, pageSize);
  }, [orderBy, keyword, page, pageSize]);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());

      setPage(1);
      contentLoad(orderBy, keyword, 1, pageSize);
    };

    window.addEventListener('resize', handleResize);
    contentLoad(orderBy, keyword, page, pageSize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [orderBy, keyword, page, pageSize]);

  return (
    <div>
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
              <input
                type="text"
                onChange={handleSearchSubmit}
                placeholder="검색할 상품을 입력해주세요."
              />
              <img className="searchIcon" src={searchIcon} alt="검색하기" />
            </div>
            <button id="postButton">상품 등록하기</button>
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
