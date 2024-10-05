import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.js';
import Board from '../Board.js';
import Items from '../Items.js';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/Board" element={<Board>자유게시판</Board>} />
          <Route path="/Items" element={<Items>중고마켓</Items>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
