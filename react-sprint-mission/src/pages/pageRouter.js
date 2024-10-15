import { createBrowserRouter } from "react-router-dom";
import App from "App";
import Home from "pages/home/home";
import Login from "pages/login/Login";
import Item from "pages/item/Item";
import Privacy from "pages/privacy/Privacy";
import Fqa from "pages/fqa/Fqa";
import Signup from "pages/signup/Signup";
import Singin from "pages/signin/Signin";
import NoticeBoard from "pages/noticeBoard/NoticeBoard";
import Market from "pages/market/Market";
import UserInfo from "pages/userInfo/UserInfo";
import AddItem from "pages/addItem/AddItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/Login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Singin /> },
      { path: "/Item", element: <Item /> },
      { path: "/Privacy", element: <Privacy /> },
      { path: "/Fqa", element: <Fqa /> },
      { path: "/NoticeBoard", element: <NoticeBoard /> },
      { path: "/Market", element: <Market /> },
      { path: "/UserInfo", element: <UserInfo /> },
      { path: "/AddItem", element: <AddItem /> },
    ],
  },
]);

export default router;
