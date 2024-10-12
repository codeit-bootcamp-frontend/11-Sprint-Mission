import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Items from './pages/items';
import Additem from './pages/additem';
import '../src/styles/App.css';

function App() {
  return (
    <Router>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/additem" element={<Additem />} />
      </Routes>
    </Router>
  );
}

export default App;
