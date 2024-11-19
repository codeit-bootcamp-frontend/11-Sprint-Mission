import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./page/MainPage";
import AddItemPage from "./page/AddItemPage";
import { ROUTES } from "./constants/Routes";
import DetailItemPage from "./page/DetailItemPage";
import LandingPage from "./page/LandingPage";
import Privacy from "./components/Privacy";
import FAQ from "./components/FAQ";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.LANDING} element={<LandingPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.PRIVACY} element={<Privacy />} />
      <Route path={ROUTES.FAQ} element={<FAQ />} />
      <Route path={ROUTES.MAIN}>
        <Route index element={<MainPage />} />
        <Route path=":productId" element={<DetailItemPage />} />
      </Route>
      <Route path={ROUTES.ADD_ITEM} element={<AddItemPage />} />
    </Routes>
  );
}

export default App;
