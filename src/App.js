import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";

const { BrowserRouter } = require("react-router-dom");

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="items" element={<ItemPage />} />
        <Route path="additem" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
