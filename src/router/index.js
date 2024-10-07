import Login from "pages/Login";
import Home from "../pages/Home";
import Signup from "pages/Signup";
import Items from "pages/Items";

const routes = [
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
];

export default routes;
