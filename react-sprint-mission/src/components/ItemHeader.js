import React from "react";
import { ImgPath } from ".";
import { Link, NavLink } from "react-router-dom";

function ItemHeader(props) {
  const getLinkStyle = (isActive) => {
    console.log("스타일 지정 가능");
  };

  return (
    <header className="navHeader">
      <div className="navigation">
        <div className="itemLogo">
          <Link to={"/"}>
            <img src={ImgPath("/common/ic_logo_item_pc.png")} alt="pandaLogo" />
          </Link>
        </div>
        <div className="navNoticeBoard">
          <NavLink to={"/noticeBoard"} style={getLinkStyle}>
            자유 게시판
          </NavLink>
        </div>
        <div className="navMarket">
          <NavLink to={"/market"} style={getLinkStyle}>
            중고 마켓
          </NavLink>
        </div>
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
