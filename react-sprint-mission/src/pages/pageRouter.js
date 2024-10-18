import { createBrowserRouter } from "react-router-dom";
import App from "App";
import Home from "pages/home/home";
import Login from "pages/login/Login";
import Items from "./items/items";
import Privacy from "pages/privacy/Privacy";
import Fqa from "pages/fqa/Fqa";
import Signup from "pages/signup/Signup";
import Singin from "pages/signin/Signin";
import NoticeBoard from "pages/noticeBoard/NoticeBoard";
import UserInfo from "pages/userInfo/UserInfo";
import AddItem from "pages/addItem/AddItem";
import Products from "pages/products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/Login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Singin /> },
      {
        path: "/Items",
        children: [
          { index: 1, element: <Items /> },
          { path: "AddItem", element: <AddItem /> },
          { path: ":id", element: <Products /> },
        ],
      },
      { path: "/Privacy", element: <Privacy /> },
      { path: "/Fqa", element: <Fqa /> },
      { path: "/NoticeBoard", element: <NoticeBoard /> },
      { path: "/UserInfo", element: <UserInfo /> },
    ],
  },
]);

export default router;
