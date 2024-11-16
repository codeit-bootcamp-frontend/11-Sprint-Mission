import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
//
import HomePage from './pages/Home.page';
import ItemsPage from './pages/Items.page';
import ItemPage from './pages/Item.page';
import AddItem from './pages/AddItem.page';

interface PagesProps {
  [page: string]: {
    title: string;
    desc: string;
  };
}

const pages: PagesProps = {
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

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage title={pages.home.title} desc={pages.home.desc} />} />
          <Route path="/items">
            <Route
              index
              element={<ItemsPage title={pages.items.title} desc={pages.items.desc} />}
            />
            <Route path=":productId" element={<ItemPage />} />
          </Route>
          <Route
            path="/additem"
            element={<AddItem title={pages.addItem.title} desc={pages.addItem.desc} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
