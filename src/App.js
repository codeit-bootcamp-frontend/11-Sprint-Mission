import ProductList from './components/ProductList';
import BestProduct from './components/BestProduct';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getProducts } from './hooks/api';

function App() {
  const [order, setOrder] = useState('createAt');
  const [items, setItems] = useState([]);
  const [bestItem, setBestItem] = useState([]);

  const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
  const BestItemsDesktop = bestItem.slice(0, 4);

  const handleNewestClick = () => setOrder('createAt');
  const handleBestClick = () => setOrder('favoriteCount');

  const handleLoad = async (orderQuery) => {
    const { list } = await getProducts(orderQuery);
    setBestItem(list);
    setItems(list);
  };

  useEffect(() => {
    handleLoad(order);
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
    </div>
  );
}

export default App;
