import Items from "./pages/Items";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
