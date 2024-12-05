import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/image/Property 1=lg.png";
import profile from "../../assets/image/size=large.png";

function Header() {
  const isAccessToken = localStorage.getItem("access_token");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="header">
      <Link to="/">
        <div>
          <img className="logo" src={logo} alt="판다마켓" />
        </div>
      </Link>
      {isAccessToken ? (
        <div className="profile-container">
          <img
            src={profile}
            alt="프로필 이미지"
            className="profile-image"
            onClick={toggleDropdown}
          />
          {isDropdownVisible && (
            <div className="dropdown">
              <button className="logout-button" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="button header-button">로그인</button>
        </Link>
      )}
    </header>
  );
}

export default Header;
