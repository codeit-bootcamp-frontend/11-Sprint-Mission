import React from "react";
import { ImgPath } from ".";
import { Link, NavLink } from "react-router-dom";

function ItemHeader(props) {
  return (
    <header className="navHeader">
      <div className="navigation">
        <div className="itemLogo">
          <Link to={"/"}>
            <img src={ImgPath("/common/ic_logo_item_pc.png")} alt="pandaLogo" />
          </Link>
        </div>
        <NavLink
          to={"/NoticeBoard"}
          className={({ isActive }) => (isActive ? "activeNav" : "inactiveNav")}
        >
          자유 게시판
        </NavLink>
        <NavLink
          to={"/Items"}
          className={({ isActive }) => (isActive ? "activeNav" : "inactiveNav")}
        >
          중고 마켓
        </NavLink>
      </div>
      <div className="userInfo">
        <Link to={"/userInfo"} className="navMarket">
          <img src={ImgPath("/common/ic_user.png")} alt="userInfo" />
        </Link>
      </div>
    </header>
  );
}

export default ItemHeader;
