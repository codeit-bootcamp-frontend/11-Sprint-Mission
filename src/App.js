import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/pages/home-page/HomePage";
import LoginPage from "./components/pages/login-page/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
