import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./page/MainPage";
import AddItemPage from "./page/AddItemPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/items" />} />
        <Route path="/items" element={<MainPage />} />
        <Route path="/additem" element={<AddItemPage />} />
      </Routes>
    </>
  );
}

export default App;
