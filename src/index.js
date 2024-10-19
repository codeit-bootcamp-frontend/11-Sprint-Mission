import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./css/reset.css";
import "./css/button.css";
import "./css/color.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPages.js";
import DetailPages from "./pages/DetailPages.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path=":id" element={<DetailPages />} />
        </Route>
        <Route path="additem" element={<AddItemPage />} />
      </Routes>
    </App>
  </BrowserRouter>
);
