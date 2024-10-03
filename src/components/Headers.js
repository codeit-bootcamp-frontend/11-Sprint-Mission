import { Link } from "react-router-dom";
import LOGO_PC from "../assets/logo.png";
import LOGO_MO from "../assets/mobiles/logo.png";
import LoginButton from "./LoginButton";

const Headers = (props) => {
  return (
    <div id='header'>
      <div className='container'>
        <h1 className='logo'>
          <a href='/'>
            <picture>
              <source srcSet={LOGO_MO} media='(max-width: 767px)' />
              <img src={LOGO_PC} alt='로고' />
            </picture>
          </a>
        </h1>
        <div>
          <Link to={"/boards"}>자유게시판</Link>
          <Link to={"/items"}>중고마켓</Link>
        </div>
        <LoginButton />
      </div>
    </div>
  );
};

export default Headers;
