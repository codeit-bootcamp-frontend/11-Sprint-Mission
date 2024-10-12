import mainLogoImg from "../img/logo/logo.png";
import userImg from "../img/icon/user.png";
import smallLogoImg from "../img/logo/smallLogo.png";
import "../css/Navbar.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [logoImg, setLogoImg] = useState(mainLogoImg);
  const location = useLocation();

  const updateLogoImage = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setLogoImg(smallLogoImg);
    } else {
      setLogoImg(mainLogoImg);
    }
  };

  useEffect(() => {
    updateLogoImage();
    window.addEventListener("resize", updateLogoImage);
    return () => {
      window.removeEventListener("resize", updateLogoImage);
    };
  }, []);

  return (
    <div className="Navibar">
      <div className="logoAndMenu">
        <Link to="/">
          <img className="MainLogo" src={logoImg} alt="판다마켓" />
        </Link>
        <div className="menu">
          <p>자유게시판</p>
          <Link
            to="/items"
            style={{
              color:
                (location.pathname === "/items" ||
                  location.pathname === "/additem") &&
                "#3692ff",
              textDecoration: "none",
            }}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <img className="UserLogo" src={userImg} alt="유저로고" />
    </div>
  );
}

export default Navbar;
