import Items from "./pages/Items";
import AddItem from "./pages/AddItem";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Items />} />
          <Route path="/items" element={<Items />} />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
          <Route path="/additem" element={<AddItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
