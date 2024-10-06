import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddItemPage from "./pages/AddItemPage/AddPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Layout/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="withHeader">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
