import React from "react";
import NavBar from "../common/NavBar";
import FavoriteItem from "../components/MainPage/FavoriteItem";
import AllItem from "../components/MainPage/AllItem";
import "./MainPage.css";

const MainPage = () => {
  return (
    <>
      <NavBar />
      <div className="main-page-box">
        <FavoriteItem />
        <AllItem />
      </div>
    </>
  );
};

export default MainPage;
