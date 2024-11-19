import { BrowserRouter, RouteObject, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Home from "../pages/Home";
import Signup from "pages/Signup";
import Items from "pages/Items";
import AddItem from "pages/AddItem";
import Detail from "pages/Detail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/items",
    element: <Items />,
  },
  {
    path: "/items/:id",
    element: <Detail />,
  },
  {
    path: "/additem",
    element: <AddItem />,
  },
];

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
