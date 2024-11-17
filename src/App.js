import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import HomePage from "./pages/HomePage/HomPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import SignupPage from "./pages/LoginPage/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="items/:productId" element={<ProductDetailPage />} />
          <Route path="community" element={<CommunityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
