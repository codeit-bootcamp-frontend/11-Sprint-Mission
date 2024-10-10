import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Items from './pages/Items';
import AddItems from './pages/AddItems';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/additem" element={<AddItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
