import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Items from './pages/items';
import Additem from './pages/additem';
import ProductDetail from './pages/ProductDetail';
import '../src/styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="items" element={<Items />} />
          <Route path="additem" element={<Additem />} />
          <Route path="items/:productId" element={<ProductDetail />} />
        </Route>
        {/* 헤더가필요하지않은부분 */}
      </Routes>
    </Router>
  );
}

export default App;
