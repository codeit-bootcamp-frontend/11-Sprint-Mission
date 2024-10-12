import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="additem" element={<AddItemPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
