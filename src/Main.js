import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Items from './Pages/Items';
import AddItem from './Pages/AddItem';

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="*" element={<Navigate to="/items" />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
