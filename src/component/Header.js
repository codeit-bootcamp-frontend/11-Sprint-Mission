import React from "react";
import Logo from "../images/logo.png";
import Profile from "../images/profile.png";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="headerSection">
                <a href="/" className="homeLogo">
                    <img src={Logo} alt="판다마켓 로고" className="logoImg" />
                </a>

                <nav>
                    <div className="listSection">
                        <a href="/community" className="communityLink">자유게시판</a>
                        <a href="/item" className="itemLink">중고마켓</a>
                    </div>  
                </nav>
            </div>

            <div className="progileSection">
                <img src={Profile} alt="프로필" className="profileImg" />
            </div>
        </header>
    );  
};

export default Header;