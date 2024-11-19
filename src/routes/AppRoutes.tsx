import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import ItemsPage from '../pages/Items/ItemsPage';
import AddProd from '../pages/AddProd/AddProd';
import Notfound from '../pages/Notfound';
import Boards from '../pages/Boards';
import Login from '../pages/Login';
import ProdDetailPage from '../pages/ProdDetail/ProdDetailPage';
import Test from '../pages/Test/Test';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='test' element={<Test />} />
      <Route path='boards' element={<Boards />} />
      <Route path='items'>
        <Route index element={<ItemsPage />} />
        <Route path=':productId' element={<ProdDetailPage />} />
      </Route>
      <Route path='addItem' element={<AddProd />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  );
}

export default AppRoutes;
