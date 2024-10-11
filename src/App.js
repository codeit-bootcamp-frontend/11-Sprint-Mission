import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./page/MainPage";
import AddItemPage from "./page/AddItemPage";
import { ROUTES } from "./constants/Routes";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.REDIRECT} element={<Navigate to={ROUTES.MAIN} />} />
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.ADD_ITEM} element={<AddItemPage />} />
    </Routes>
  );
}

export default App;
