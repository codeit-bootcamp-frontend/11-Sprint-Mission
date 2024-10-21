import { Routes, Route } from "react-router-dom";
import Items from "./pages/Items";
import AddItem from "./pages/AddItem";
import Navbar from "./components/Navbar";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
