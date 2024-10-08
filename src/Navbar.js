import mainLogoImg from "./img/logo/logo.png";
import userImg from "./img/icon/user.png";
import smallLogoImg from "./img/logo/smallLogo.png";
import "./css/Navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
  const [logoImg, setLogoImg] = useState(mainLogoImg);

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
        <img className="MainLogo" src={logoImg} alt="판다마켓" />
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
