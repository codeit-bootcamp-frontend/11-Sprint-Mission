import { Routes, Route } from "react-router-dom";
import React from "react";
import Main from "../pages/Main";
import Items from "../pages/Items";
import AddItem from "../pages/AddItem";
import Notfound from "../pages/Notfound";
import Boards from "../pages/Boards";
import Login from "../pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/boards' element={<Boards />} />
      <Route path='/items' element={<Items />} />
      <Route path='/additem' element={<AddItem />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  );
}
