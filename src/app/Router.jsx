import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Items from "../pages/Items/index";
import Home from "../pages/home/index";
import AddItem from "../pages/addItem/index";
import Layout from "../shared/ui/layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/addItem" element={<AddItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
