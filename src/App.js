import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Items from './pages/items';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/Items" element={<Items>중고마켓</Items>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
