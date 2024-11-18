import Items from "./pages/Items";
import AddItem from "./pages/AddItem";
import ItemDetailForm from "./components/ItemDetailForm";
import Layout from "./layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Items />} />
          <Route path="items" element={<Items />} />
          <Route path="items/:productId" element={<ItemDetailForm />} />
          <Route path="additem" element={<AddItem />} />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
