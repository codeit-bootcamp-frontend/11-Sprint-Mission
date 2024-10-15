import React from "react";
import Nav from "../header/Nav";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        {" "}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
