import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route index element={<HomePage />}/>
          <Route path="login" element={<LoginPage />}/>
          <Route path="items" element={<MarketPage />}/>
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
