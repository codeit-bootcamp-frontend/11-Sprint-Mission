import Logo from "../../images/logo/panda-market-logo.png";
import userImage from "../../images/logo/size=large@3x.png";
import "./Banner.css";

function Banner() {
  return (
    <header>
      <img className="logo" src={Logo} alt="logo" />
      <nav>
        <p>자유게시판</p>
        <p>중고마켓</p>
      </nav>
      <img className="userLogo" src={userImage} alt="userLogo" />
    </header>
  );
}

export default Banner;
