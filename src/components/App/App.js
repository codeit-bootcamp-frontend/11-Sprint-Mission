import "./App.css";
import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AddItemForm from "../AddItemForm/AddItemForm";
import ItemListPage from "../../pages/ItemListPage";
import { DeviceTypeProvider } from "../../contexts/DeviceTypeContext";

function App() {
  return (
    <DeviceTypeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/items" element={<ItemListPage />} />
            <Route path="/additem" element={<AddItemForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeviceTypeProvider>
  );
}

// @todo 뷰포트 너비 구하는 핸들러 -> 커스텀 훅으로 만들 예정
function Main() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
