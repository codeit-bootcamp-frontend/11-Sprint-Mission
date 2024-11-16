import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from '../pages/Main';
import ItemsPage from '../pages/Items/ItemsPage';
import AddItem from '../pages/AddItem';
import Notfound from '../pages/Notfound';
import Boards from '../pages/Boards';
import Login from '../pages/Login';
import ProdDetailPage from '../pages/prodDetail/ProdDetailPage';
import Test from '../pages/Test/Test';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='test' element={<Test />} />
      <Route path='boards' element={<Boards />} />
      <Route path='items'>
        <Route index element={<ItemsPage />} />
        <Route path=':productId' element={<ProdDetailPage />} />
      </Route>
      <Route path='addItem' element={<AddItem />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  );
}
