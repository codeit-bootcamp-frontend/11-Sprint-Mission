import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Item from "./pages/Item";
import New from "./pages/New";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items">
          <Route index element={<Item />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="/addItem" element={<New />} />
      </Routes>
    </>
  );
}

export default App;
