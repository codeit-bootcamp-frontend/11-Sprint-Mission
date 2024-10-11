import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Freeboard from './pages/Freeboard';
import Items from './pages/Items';
import AddItem from './pages/Additem';
import './styles/Reset.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
