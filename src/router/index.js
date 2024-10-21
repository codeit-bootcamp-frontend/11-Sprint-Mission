import Login from "pages/Login";
import Home from "../pages/Home";
import Signup from "pages/Signup";
import Items from "pages/Items";
import AddItem from "pages/AddItem";
import Detail from "pages/Detail";

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
  {
    path: "/items/:id",
    element: <Detail />,
  },
  {
    path: "/additem",
    element: <AddItem />,
  },
];

export default routes;
