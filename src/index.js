import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./css/reset.css";
import "./css/button.css";
import "./css/color.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
