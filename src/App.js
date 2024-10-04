import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Items from './pages/Items';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
