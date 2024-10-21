import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//
import App from './App';
import Home from './Pages/Home';
import Items from './Pages/Items';
import Item from './Pages/Item';
import AddItem from './Pages/AddItem';

const pageInfo = {
  home: {
    title: '판다마켓',
    desc: '판다마켓 입니다.',
  },
  items: {
    title: '중고마켓 | 판다마켓',
    desc: '판다마켓에 중고마켓 상품 목록 페이지 입니다.',
  },
  addItem: {
    title: '상품 등록 | 판다마켓',
    desc: '판다마켓에 중고마켓 상품 등록 페이지 입니다.',
  },
};

function Main() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home title={pageInfo.home.title} desc={pageInfo.home.desc} />} />
            <Route path="/items">
              <Route
                index
                element={<Items title={pageInfo.items.title} desc={pageInfo.items.desc} />}
              />
              <Route path=":productId" element={<Item />} />
            </Route>
            <Route
              path="/additem"
              element={<AddItem title={pageInfo.addItem.title} desc={pageInfo.addItem.desc} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default Main;
