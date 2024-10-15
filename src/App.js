import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Items from "./pages/items";
import AddItems from "./pages/additems";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="additem" element={<AddItems />} />
        <Route path="/" element={<Navigate to="/items" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
