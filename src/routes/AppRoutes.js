import { Routes, Route } from "react-router-dom";
import React from "react";
import Main from "../pages/Main";
import Items from "../pages/Items";
import AddItem from "../pages/AddItem";
import Notfound from "../pages/Notfound";
import Boards from "../pages/Boards";
import Login from "../pages/Login";

const routes = [
  { path: "", element: <Main /> },
  { path: "/boards", element: <Boards /> },
  { path: "/items", element: <Items /> },
  { path: "/additem", element: <AddItem /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Notfound /> },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
