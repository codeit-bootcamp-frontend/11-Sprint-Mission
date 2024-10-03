import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import LOGO_PC from "../assets/logo.png";
import LOGO_MO from "../assets/mobiles/logo.png";
import LoginButton from "./LoginButton";
import ProfileImage from "./ProfileImage";

const getNavLinkStyle = ({ isActive }) => ({
  color: isActive ? "var(--blue-100)" : "var(--gray-600)",
});

const Headers = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div id='header'>
      <div className='container'>
        <h1 className='logo'>
          <Link to={"/"}>
            <picture>
              <source srcSet={LOGO_MO} media='(max-width: 767px)' />
              <img src={LOGO_PC} alt='로고' />
            </picture>
          </Link>
        </h1>
        <div className='gnb'>
          <NavLink to={"/boards"} style={getNavLinkStyle}>
            자유게시판
          </NavLink>
          <NavLink to={"/items"} style={getNavLinkStyle}>
            중고마켓
          </NavLink>
        </div>
        {isLogin ? <ProfileImage size={{ width: "4rem", height: "4rem" }} /> : <LoginButton />}
      </div>
    </div>
  );
};

export default Headers;
