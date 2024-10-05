import React from "react";
import NavBar from "../common/NavBar";
import FavoriteItem from "../components/FavoriteItem";
import AllItem from "../components/AllItem";
import "../css/MainPage.css";

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
