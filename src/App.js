import Items from "./pages/Items";
import AddItem from "./pages/AddItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items" element={<Items />} />
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
