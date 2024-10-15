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

function Main() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
