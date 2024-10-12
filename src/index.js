import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
// import MainPage from "./pages/main/MainPage";
import AddItem from "./pages/additem/AddItem";
// import Items from "./pages/items/Items";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AddItem />);

// url 경로에 따라 화면 이동 라우팅 - 제공X
// 다른 모듈을 사용.
