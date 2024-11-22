import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="items" element={<ItemPage />} />
        <Route path="additem" element={<AddItemPage />} />
        <Route path="items/:productId" element={<ItemDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
