import Header from "./components/Header";
import Additem from "./page/Additem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemContainer from "./page/ItemCotainer";
import FreeBoard from "./page/FreeBoard";
import Mainpage from "./page/Mainpage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Mainpage />} />
        <Route path="FreeBoard" element={<FreeBoard />} />
        <Route path="ItemContainer" element={<ItemContainer />} />
        <Route path="Additem" element={<Additem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
