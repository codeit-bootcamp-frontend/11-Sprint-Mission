import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/home/HomePage';
import LoginPage from './components/pages/auth/LoginPage';
import SignupPage from './components/pages/auth/SignupPage';
import ItemsPage from './components/pages/items/ItemsPage';
import AddItemPage from './components/pages/additem/AddItemPage';
import ProductDetail from './components/pages/items/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ProductDetail />} />
        <Route path="/additem" element={<AddItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
