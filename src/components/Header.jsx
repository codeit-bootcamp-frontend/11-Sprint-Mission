import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";

import Btn from "./Button/Btn";
import Profile from "../assets/icons/ic_profile.svg";
import Logo from "../assets/logo.svg";
import MobileLogo from "../assets/logo_mobile.svg";

import useWindowWidth from "../hooks/useWindowWidth";

function Header({ isLogined, isMain }) {
  const windowWidth = useWindowWidth();
  const location = useLocation(); // 현재 경로를 가져옴

  const activeStyle = {
    color: "#3692FF",
  };

  return (
    <div className="Header">
      <section className="Header__left">
        <img
          src={windowWidth > 767 ? Logo : MobileLogo}
          alt="logo"
          className="Header__logo"
        />
        {isMain && (
          <>
            <div className="Tab">
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                자유게시판
              </NavLink>
            </div>
            <div className="Tab">
              <NavLink
                to="/items"
                style={() =>
                  location.pathname === "/items" ||
                  location.pathname === "/additem"
                    ? activeStyle
                    : undefined
                }
              >
                중고마켓
              </NavLink>
            </div>
          </>
        )}
      </section>
      <section className="Header__right">
        {isLogined ? (
          <img src={Profile} alt="profile" />
        ) : (
          <Btn text={"로그인"} />
        )}
      </section>
    </div>
  );
}

export default Header;
