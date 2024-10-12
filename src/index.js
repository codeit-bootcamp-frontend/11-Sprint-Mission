import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./css/reset.css";
import "./css/button.css";
import "./css/color.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPages.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addItem" element={<AddItemPage />} />
      </Routes>
    </App>
  </BrowserRouter>
);
