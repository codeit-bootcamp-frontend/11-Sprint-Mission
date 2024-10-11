import React from "react";
import Nav from "../header/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
