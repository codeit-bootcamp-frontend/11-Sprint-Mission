import "./App.css";
import Navigation from "../Navigation/Navigation";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import ItemListPage from "../../pages/ItemListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/items" element={<ItemListPage />} />
          <Route path="/additem" element={<AddItemForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// @todo 뷰포트 너비 구하는 핸들러 -> 커스텀 훅으로 만들 예정
function Main() {
  const [view, setView] = useState();
  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1200) setView("desktop");
    else if (width >= 768) setView("tablet");
    else setView("mobile");
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navigation />
      <Outlet view={view} />
    </>
  );
}

export default App;
