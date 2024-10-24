import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import HomePage from "./pages/HomPage";
import LoginPage from "./pages/LoginPage";
import MarketPage from "./pages/MarketPage";
import AddItemPage from "./pages/AddItemPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
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
