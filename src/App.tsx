import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
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
import { useSelector } from "react-redux";

function App() {
  // const isAccessToken = localStorage.getItem("access_token");
  const count = useSelector((state: any) => state.counter.value);
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
  return (
    <Routes>
      <Route path={ROUTES.LANDING} element={<LandingPage />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          count === true ? <Navigate to={ROUTES.LANDING} /> : <LoginPage />
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          count === true ? <Navigate to={ROUTES.LANDING} /> : <RegisterPage />
        }
      />
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
