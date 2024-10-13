import React from "react";
import { useEffect, useState } from "react";
import { getProducts } from "./api/api";
import Header from "./component/Header";
import AllProduct from "./component/AllProduct";
import BestProduct from "./component/BestProduct";
// import Market from "./pages/Market";
// import Dropdown from "./component/Dropdown";
// import SortIcon from "./images/ic_sort.svg";
// import SearchIcon from "./images/ic_search.svg";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState('createAt');
  const [items, setItems] = useState([]);
  const [bestItem, setBestItem] = useState([]);
  const [offset, setOffset] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
  const BestProductItem = bestItem.slice(0, 4);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLoad = async (options) => {
    const { list } = await getProducts(options);
    if (options.offset === 0) {
      setItems(list);
    } else {
      setItems([...items, ...list]);
    }
    setOffset(options.offset + list.length);
    setBestItem(list);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
      <div className="App">
        <Header />
        <div>
          <div>
            <p>베스트 상품</p>
            <BestProduct items={BestProductItem} /> 
          </div>

          <div className="AllProductList">
            <div className="subHeader">
              <p className="subTitle">전체 상품</p>
              <div className="product_up">
                <input  className="searchInput"
            placeholder="검색할 상품을 입력해 주세요"/>
                <button className="product_btn">상품 등록하기</button>
                <div className="dropdown">
                  <button className="dropdown_btn" onClick={toggleDropdown}>
                    {order === 'createAt' ? '최신순' : '베스트순'} ▼
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown_menu">
                      <p
                        onClick={() => {
                          setOrder('createAt');
                          setDropdownOpen(false);
                        }}
                      >
                        최신순
                      </p>
                      <p onClick={() => {
                          setOrder('favoriteCount');
                          setDropdownOpen(false);
                      }}>
                        베스트순
                      </p>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <AllProduct items={sortedItems} />
          </div>
        </div>
      </div>

  );
};

export default App;
