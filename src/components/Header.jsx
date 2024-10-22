import { Link } from "react-router-dom";
import "../styles/style.css";
import "./Header.css";
import imgLogo from "../images/logo.png";
import imgProfile from "../images/ic_profile_large.svg";

const Header = ({ isLogin }) => {
  return (
    <div className="nav">
      <div>
        <Link to="/" className="logo">
          <img src={imgLogo} alt="사이트 로고" />
        </Link>
        {isLogin ? (
          <div className="nav-menu">
            <p>자유게시판</p>
            <p>중고마켓</p>
          </div>
        ) : null}
      </div>
      {isLogin ? (
        <img src={imgProfile} alt="프로필 사진" className="profile-image" />
      ) : (
        <Link to="/login" className="login">
          로그인
        </Link>
      )}
    </div>
  );
};

export default Header;
