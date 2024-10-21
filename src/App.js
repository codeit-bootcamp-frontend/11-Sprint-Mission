import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./page/MainPage";
import AddItemPage from "./page/AddItemPage";
import { ROUTES } from "./constants/Routes";
import DetailItemPage from "./page/DetailItemPage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.REDIRECT} element={<Navigate to={ROUTES.MAIN} />} />
      <Route path={ROUTES.MAIN}>
        <Route index element={<MainPage />} />
        <Route path=":productId" element={<DetailItemPage />} />
      </Route>
      <Route path={ROUTES.ADD_ITEM} element={<AddItemPage />} />
    </Routes>
  );
}

export default App;
