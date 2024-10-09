import Notfound from "./pages/Notfound";
import Items from "./pages/items/Items";
import AddItems from "./pages/additem/AddItem";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/additem" element={<AddItems />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
