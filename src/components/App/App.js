import "./App.css";
import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AddItemForm from "../AddItemForm/AddItemForm";
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
            <Route path="additem" element={<AddItemForm />} />
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
