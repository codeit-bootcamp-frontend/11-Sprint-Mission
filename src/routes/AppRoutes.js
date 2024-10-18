import { Routes, Route } from "react-router-dom";
import React from "react";
import Main from "../pages/Main";
import Items from "../pages/Items";
import AddItem from "../pages/AddItem";
import Notfound from "../pages/Notfound";
import Boards from "../pages/Boards";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="boards" element={<Boards />} />
      <Route path="items">
        <Route index element={<Items />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>
      <Route path="addItem" element={<AddItem />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
