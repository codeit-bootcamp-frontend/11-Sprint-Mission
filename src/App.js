import "./styles/common.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Headers from "./components/Headers";
import Main from "./pages/Main";
import Items from "./pages/Items";
import AddItem from "./pages/AddItem";
import Notfound from "./pages/Notfound";
import Boards from "./pages/Boards";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/notfound" && <Headers />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/boards' element={<Boards />} />
        <Route path='/items' element={<Items />} />
        <Route path='/additem' element={<AddItem />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
