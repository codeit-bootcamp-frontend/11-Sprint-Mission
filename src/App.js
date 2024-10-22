import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/additem" element={<AddItemPage />} />
    </Routes>
  );
}

export default App;
