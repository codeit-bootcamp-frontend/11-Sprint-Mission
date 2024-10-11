import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Items from "./pages/items";
import AddItems from "./pages/additems";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="additems" element={<AddItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
