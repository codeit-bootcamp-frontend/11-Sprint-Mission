import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/common/App";
import "./css/reset.css";
import "./css/button.css";
import "./css/color.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPages from "./pages/DetailPage.js";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import AddItemPage from "./pages/AddItemPage.js";
import MarketPage from "./pages/MarketPage";
import SignupPage from "./pages/SignupPage.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="items">
          <Route index element={<MarketPage />} />
          <Route path=":id" element={<DetailPages />} />
        </Route>
        <Route path="additem" element={<AddItemPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </App>
  </BrowserRouter>
);
