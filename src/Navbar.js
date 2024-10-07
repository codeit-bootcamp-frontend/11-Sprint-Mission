import mainImg from "./img/logo/logo.png";
import userImg from "./img/icon/user.png";
import "./css/Navbar.css";

function Navbar() {
  return (
    <div className="Navibar">
      <div className="logoAndMenu">
        <img className="MainLogo" src={mainImg} alt="판다마켓" />
        <div className="menu">
          <p>자유게시판</p>
          <p>중고마켓</p>
        </div>
      </div>
      <img className="UserLogo" src={userImg} alt="유저로고" />
    </div>
  );
}

export default Navbar;
