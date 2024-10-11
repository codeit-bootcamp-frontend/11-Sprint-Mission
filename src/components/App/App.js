import "./App.css";
import Navigation from "../Navigation/Navigation";
import BestItemList from "../BestItemList/BestItemList";
import ItemList from "../ItemList/ItemList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navigation />
      </header>
      <Routes>
        <Route path="/items" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

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
  }, []);

  useEffect(() => {
    console.log(view);
  }, [view]);

  return (
    <main className="main-wrapper">
      <BestItemList view={view} />
      <ItemList view={view} />
    </main>
  );
}

export default App;
