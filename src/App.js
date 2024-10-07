import ProductList from './components/ProductList';
import BestProduct from './components/BestProduct';
import Header from './components/Header';
import '../src/styles/App.css';
import { useEffect, useState } from 'react';
import { getProducts } from './hooks/api';

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState('createAt');
  const [items, setItems] = useState([]);
  const [bestItem, setBestItem] = useState([]);
  const [offset, setOffset] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
  const BestItemsDesktop = bestItem.slice(0, 4);

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
    <div className="pandaMarket">
      <Header />
      <div className="page">
        <div className="bestProduct">
          <p className="subTitle">베스트 상품</p>
          <BestProduct items={BestItemsDesktop} />
        </div>

        <div className="AllProductList">
          <div className="subHeader">
            <p className="subTitle">전체 상품</p>
            <div className="sub">
              <input></input>
              <button className="productUp">상품 등록하기</button>
              <div className="dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                  {order === 'createAt' ? '최신순' : '베스트순'} ▼
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <p
                      onClick={() => {
                        setOrder('createAt');
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
          <ProductList items={sortedItems} />
          <button onClick={handleLoadMore}>더보기</button>
        </div>
      </div>
    </div>
  );
}

export default App;
