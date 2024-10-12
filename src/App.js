import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Items from './pages/Items';
import AddItems from './pages/AddItems';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/additem" element={<AddItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
