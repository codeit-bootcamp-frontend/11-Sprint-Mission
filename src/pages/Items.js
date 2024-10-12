import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

const { BrowserRouter } = require("react-router-dom");

function Items() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

export default Items;
