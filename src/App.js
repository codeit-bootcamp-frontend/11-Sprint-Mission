import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/main/MainPage";
import LoginPage from "./pages/login/Login";
import ItemsPage from "./pages/items/Items";

// import AddItem from "./pages/addItem/AddItem";
// import Items from "./pages/items/Items";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
