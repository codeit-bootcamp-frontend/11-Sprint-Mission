import "./App.css";
import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AddItemPage from "../../pages/AddItemPage/AddItemPage";
import ItemListPage from "../../pages/ItemListPage/ItemListPage";
import { DeviceTypeProvider } from "../../contexts/DeviceTypeContext";
import ItemDetailPage from "../../pages/ItemDetailPage/ItemDetailPage";

function App() {
  return (
    <DeviceTypeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="items">
              <Route index element={<ItemListPage />} />
              <Route path=":id" element={<ItemDetailPage />} />
            </Route>
            <Route path="additem" element={<AddItemPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeviceTypeProvider>
  );
}

function Main() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
