import { Routes, Route } from "react-router-dom";
import Notfound from "./Notfound";
import Items from "./Items";
import Item from "./Item";
import AddItem from "./AddItem";
import Boards from "./Boards";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/items">
        <Route index element={<Items />} />
        <Route path=":id" element={<Item />} />
      </Route>
      <Route path="/addItem" element={<AddItem />} />

      <Route path="/boards" element={<Boards />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
