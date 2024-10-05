import { createBrowserRouter } from "react-router-dom";
import Home from "./home/home";
import Login from "./login/Login";
import Item from "./item/Item";
import Privacy from "./privacy/Privacy";
import Fqa from "./fqa/Fqa";
import Signup from "./signup/Signup";
import Singin from "./signin/Signin";
import NoticeBoard from "./noticeBoard/NoticeBoard";
import Market from "./market/Market";
import UserInfo from "./userInfo/UserInfo";
import AddItem from "./addItem/AddItem";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
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
]);

export default router;
