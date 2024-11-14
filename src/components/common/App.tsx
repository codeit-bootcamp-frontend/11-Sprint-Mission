import React from "react";
import "../css/App.css";
import Nav from "./Nav";
import { AppProps } from "../../types";

const App = ({ children }: AppProps) => {
  return (
    <>
      <Nav></Nav>
      <div className="container">{children}</div>
    </>
  );
};

export default App;
