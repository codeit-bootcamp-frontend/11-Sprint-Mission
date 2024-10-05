import './css/Items.css';
import getItems from './service/api.js';
import ItemList from './library/items/ItemList.js';
import Dropdown from './library/items/Dropdown.js';
import polygonon from './assets/Polygon.png';
import polygonoff from './assets/PolygonB.png';
import searchIcon from './assets/searchIcon.png';
import { useEffect } from 'react';
import { useState } from 'react';

function Items() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [isDropdownView, setDropdownView] = useState(false);
  const [orderBy, setOrderBy] = useState('recent');
  const [selectMenu, setSelectMenu] = useState('최신순');

  const contentLoad = async (orderBy) => {
    const { list } = await getItems(orderBy);
    setProducts(list);

    const { list: bestItems } = await getItems((orderBy = 'favorite'));
    setBestProducts(bestItems);
  };

  const bannerBestItems = bestProducts.slice(0, 4);

  const handleClickAlign = () => {
    setDropdownView(!isDropdownView);
  };

  const handleSelectMenu = (onSelect) => {
    setSelectMenu(onSelect);
    setOrderBy(onSelect === '최신순' ? 'recent' : 'favorite');
    setDropdownView(false);
  };

  useEffect(() => {
    contentLoad(orderBy);
  }, [orderBy]);

  return (
    <div>
      <div className="bestProducts">
        <h1>베스트 상품</h1>
        <ul className="bestProductList">
          {bannerBestItems.length > 0 ? (
            bannerBestItems.map((item) => (
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
            <input type="text" placeholder="검색할 상품을 입력해주세요." />
            <img className="searchIcon" src={searchIcon} alt="검색하기" />
            <button>상품 등록하기</button>
            <div className="selectAlignMenu">
              <label onClick={handleClickAlign}>
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
          {products.length > 0 ? (
            products.map((item) => (
              <li key={item.id}>
                <ItemList className="itemList" item={item} />
              </li>
            ))
          ) : (
            <li>등록된 상품이 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Items;
