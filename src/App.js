import ProductList from './components/ProductList';
import BestProduct from './components/BestProduct';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getProducts } from './hooks/api';

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState('createAt');
  const [items, setItems] = useState([]);
  const [bestItem, setBestItem] = useState([]);
  const [offset, setOffset] = useState(0);
  // 더이상불러올데이터가없을때는어떻게구현해야될지..?(강의: 리액트데이터다루기-데이터더불러오기)

  const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
  const BestItemsDesktop = bestItem.slice(0, 4);

  const handleNewestClick = () => setOrder('createAt');
  const handleBestClick = () => setOrder('favoriteCount');

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
    <div>
      <Header />
      <p>베스트상품~~~~~~~~~~~~~</p>
      <BestProduct items={BestItemsDesktop} />
      <p>전체상품~~~~~~~~~~~</p>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>베스트순</button>
      <ProductList items={sortedItems} />
      <button onClick={handleLoadMore}>더보기</button>
    </div>
  );
}

export default App;
