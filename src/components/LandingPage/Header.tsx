import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/image/Property 1=lg.png";
import profile from "../../assets/image/size=large.png";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/counterAccessToken";
import { RootState } from "../../redux/store";

function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(reset());
    localStorage.clear();
  };

  return (
    <header className="header">
      <Link to="/">
        <div>
          <img className="logo" src={logo} alt="판다마켓" />
        </div>
      </Link>
      {count ? (
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
