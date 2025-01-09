import { Navigate, Route, Routes } from "react-router-dom";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddBoardPage from "./page/AddBoardPage";
import BoardsPage from "./page/BoardsPage";

const queryClient = new QueryClient();

function App() {
  const count = useSelector((state: any) => state.counter.value);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <Route path={ROUTES.ADD_BOARD} element={<AddBoardPage />} />
        <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
        <Route path={ROUTES.MAIN}>
          <Route index element={<MainPage />} />
          <Route path=":productId" element={<DetailItemPage />} />
        </Route>
        <Route path={ROUTES.ADD_ITEM}>
          <Route index element={<AddItemPage />} />
          <Route path=":productId" element={<AddItemPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
