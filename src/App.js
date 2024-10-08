import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Items from './pages/items';
import Additem from './pages/additem';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/additem" element={<Additem />} />
      </Routes>
    </Router>
  );
}

export default App;
