import "./App.css";
import ItemList from "./assets/components/ItemList/ItemList";
import BestItemList from "./assets/components/BestItemList/BestItemList";
import Navigation from "./assets/components/Navigation/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  return (
    <main className="main-wrapper">
      <BestItemList />
      <ItemList />
    </main>
  );
}

export default App;
