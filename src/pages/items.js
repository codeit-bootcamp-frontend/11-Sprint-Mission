import ProductList from '../components/ProductList';
import BestProduct from '../components/BestProduct';
import '../styles/items.css';
import { useEffect, useState } from 'react';
import { getProducts } from '../hooks/api';
import { Link } from 'react-router-dom';

const LIMIT = 6;

function Items() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]);
  const [bestItem, setBestItem] = useState([]);
  const [offset, setOffset] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
  const BestItemsDesktop = bestItem.slice(0, 4);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLoad = async (options) => {
    try {
      const { list } = await getProducts(options.order);

      if (options.offset === 0) {
        setItems(list);
      } else {
        setItems([...items, ...list]);
      }

      setOffset(options.offset + list.length);
      setBestItem(list);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <>
      <div className="pandaMarket">
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
            <ProductList items={sortedItems} />
            <button onClick={handleLoadMore}>더보기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;