import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Freeboard from "./pages/Freeboard";
import Items from "./pages/Items";
import AddItem from "./pages/Additem";
import ItemDetailPage from "./pages/ItemDetailPage";
import "./styles/Reset.css";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:productId" element={<ItemDetailPage />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
