import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Freeboard from './pages/Freeboard';
import Items from './pages/Items';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </Router>
  );
}

export default App;
