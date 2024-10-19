import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './Pages/Home';
import Items from './Pages/Items';
import Item from './Pages/Item';
import AddItem from './Pages/AddItem';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/items">
            <Route index element={<Items />} />
            <Route path=":productId" element={<Item />} />
          </Route>
          <Route path="/additem" element={<AddItem />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
