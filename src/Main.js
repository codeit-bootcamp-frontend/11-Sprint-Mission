import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Items from './Pages/Items';
import AddItem from './Pages/AddItem';
import Home from './Pages/Home';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
