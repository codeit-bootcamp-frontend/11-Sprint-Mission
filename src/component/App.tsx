import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/component/Header';
import Board from '@/Board';
import Items from '@/Items';
import AddItem from '@/AddItem';
import Product from '@/Product';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/Board" element={<Board>자유게시판</Board>} />
          <Route path="/Items">
            <Route index element={<Items>중고마켓</Items>} />
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="/AddItem" element={<AddItem />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
