import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Items from './pages/items';
import Additem from './pages/additem';
import ProductId from './pages/productId';
import '../src/styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="items" element={<Items />} />
          <Route path="additem" element={<Additem />} />
          <Route path="items/:productId" element={<ProductId />} />
        </Route>
        //Header가 필요하지 않은 부분
      </Routes>
    </Router>
  );
}

export default App;
