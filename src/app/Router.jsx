import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Items from "../pages/Items/Items";
import Home from "../pages/home/Home";
import AddItem from "../pages/addItem/AddItem";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/addItem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
